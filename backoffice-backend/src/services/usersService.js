import unixCrypt from 'unix-crypt-td-js';
import config from "../config.js"
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../db/index.js"
import { toLowerCaseRelations, useLikeOperation } from '../utils/functions.js';
import { AGENCY_CLIENT_ID, EMPTY_AGENCY_ID, EMPTY_USER, ROLES } from '../utils/constants.js';
import { Op } from 'sequelize';

/**
 * Encrypts the password with the old algorithm used in the old version of the app (php 5.4)
 * @param {String} password text plain password user 
 * @param {String} salt Salt used to encrypt password 
 * @returns {String} hashed password (old algorithm)
 */
async function encryptPasswordWithOldAlgorithm(password, salt) {
	return unixCrypt(password, salt);
}

async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

/**
 * Updates the hashed password generated in the previous app version (php 5.4) with 
 * new hashed version of the app (This app, Node)
 * @param {User} user 
 * @param {String} password text plain password user 
 */
async function updatePasswordHashAlgorithm(user, password) {
	const hashedPassword = await hashPassword(password);
	user.password = hashedPassword;
	await user.save();
}

function invalidUsernameOrPassoword() {
	throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid username or password" };
}

function createJWT(user) {
	user = user.get({ plain:true })
	let jwtPayload = { 
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		role: user.Profile.role,
		client: user.Client
	}
	jwtPayload = toLowerCaseRelations(jwtPayload)
	jwtPayload.client.group = jwtPayload.client.clientGroup
	delete jwtPayload.client.clientGroup
	const token = jwt.sign(jwtPayload, config.secretApiKey, { expiresIn: '1h' });
	return { token }
}

async function checkUsernameAvailable(username) {
	if (username == undefined) return
	const userByUsename = await User.findOne({where: { username } })
	if (userByUsename)
		throw { message: `user with username ${username} already exists`, statusCode: StatusCodes.BAD_REQUEST }
}

export const login = async (username, password) => {
	//TODO: Check if the user is active
	const userDb = await User.findOne({ where: { username } });
	const { type, providerId, personalId, profileId } = userDb;
	if (userDb == null) {
		invalidUsernameOrPassoword()
	}
	const hasOldHashPassword = (user) => user.password.length === 13
	if (hasOldHashPassword(userDb)) {
		const passwordHashed = await encryptPasswordWithOldAlgorithm(password, config.passwordSalt);
		const match = passwordHashed == userDb.password
		if (match) {
			await updatePasswordHashAlgorithm(userDb, password)
		}
	}
	const match = await bcrypt.compare(password, userDb.password);
	if (match) {
		let username = ''
		if (type == 'PERSONAL') {
			const personal = await Personal.findByPk(personalId)
			//TODO: check personal is active
			if (personal.inactive) {
				throw { message: "personal is inactive", statusCode: StatusCodes.BAD_REQUEST }
			}
			username = personal.name + ' ' + personal.lastname
		} else if (type == 'PROVEEDOR') {
			const provider = await Provider.findByPk(providerId)
			//TODO: check provider is active
			if (provider.inactive) {
				throw { message: "provider is inactive", statusCode: StatusCodes.BAD_REQUEST }
			}
			username = provider.lastname
		}
		return createJWT(userDb)
	} else {
		invalidUsernameOrPassoword()
	}
};

export const changePassword = async (currentPassword, newPassword, user) => {
	const userDb = await User.findOne({ where: { username: user.username } });
	const match = await bcrypt.compare(currentPassword, userDb.password);
	if (!match) {
		invalidUsernameOrPassoword()
	}
	userDb.password = await hashPassword(newPassword);
	await userDb.save();
};

export const create = async (userParam) => {
	const availableRolesForAgency = [ROLES.AGENT, ROLES.ADMIN, ROLES.AUDITOR]
	const availableRolesForExternalClient = [ROLES.APPLICANT, ROLES.AUTHORIZER, ROLES.AUDITOR]
    if (userParam.clientId == AGENCY_CLIENT_ID && !availableRolesForAgency.includes(userParam.role))
		throw { message: "Users of the agency only can have roles [ADMIN, AGENT, AUDITOR]", statusCode: StatusCodes.BAD_REQUEST }
	if (userParam.clientId != AGENCY_CLIENT_ID && !availableRolesForExternalClient.includes(userParam.role))
		throw { message: "External users only can have roles [APPLICANT, AUTHORIZER, AUDITOR]", statusCode: StatusCodes.BAD_REQUEST }
	await checkUsernameAvailable(userParam.username)
	userParam.password = await hashPassword(userParam.password);
	const profile = await Profile.findOne({ where: { role: userParam.role } })
	if (!profile)
		throw { message: `role ${userParam.role} not exists`, statusCode: StatusCodes.BAD_REQUEST }
	delete userParam.role
	userParam.profileId = profile.id
	userParam.inactive = userParam.inactive ? 1 : 0
    let user = await User.create(userParam)
	user = user.get({ plain: true })
	delete user.password
    return user
};

export const getAll = async () => {
	const users = await User.findAll({ where: {
			id: {[Op.ne]: EMPTY_USER}
		},
		include: [Client, Profile],
		order: [
			['inactive'],
			['lastName'],
			['firstName']
		]
	})
	return users.map(user => {
		user = user.get({ plain: true })
		delete user.password
		return user
	})
};

export const update = async (userId, userParam) => {
    await checkUsernameAvailable(userParam.username)
	if (userParam.password) {
		userParam.password = await hashPassword(userParam.password);
	}
    await User.update(userParam, { where: { id: userId }})
    let updatedUser = await User.findByPk(userId)
    updatedUser = updatedUser.get({ plain: true })
	delete updatedUser.password
	return updatedUser
};

export const deleteById = async (id) => {
    return User.destroy({ where: { id }})
};