import unixCrypt from 'unix-crypt-td-js';
import config from "../config.js"
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuarios, Personal, Perfil } from "../db/index.js"
import { toLowerCaseRelations, useLikeOperation } from '../utils/functions.js';
import { ROLES } from '../utils/constants.js';
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
	user.Password = hashedPassword;
	await user.save();
}

function invalidUsernameOrPassword() {
	throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid username or password" };
}

function isInactive(entity) {
	return entity.FechaBaja != '0000-00-00';
}

function createJWT(user, extraParams) {
	user = user.get({ plain:true })
	let jwtPayload = { 
		username: user.Usuario,
		type: user.Tipo,
		...extraParams,
	}
	jwtPayload = toLowerCaseRelations(jwtPayload)
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
	const userDb = await Usuarios.scope(null).findOne({ where: { Usuario: username } });
	if (userDb == null || isInactive(userDb)) {
		invalidUsernameOrPassword()
	}
	const { Tipo, IdPersonal, IdPerfil } = userDb;
	const hasOldHashPassword = (user) => user.Password.length === 13
	if (hasOldHashPassword(userDb)) {
		const passwordHashed = await encryptPasswordWithOldAlgorithm(password, config.passwordSalt);
		const match = passwordHashed == userDb.Password
		if (match) {
			await updatePasswordHashAlgorithm(userDb, password)
		}
	}
	const match = await bcrypt.compare(password, userDb.Password);
	if (match) {
		let extraParams = {
			firstName: "",
			lastName: "",
			idPerfil: IdPerfil,
			idPersonal: IdPersonal,
		}
		if (Tipo == 'PERSONAL') {
			const personal = await Personal.findByPk(IdPersonal)
			//TODO: check personal is active
			if (isInactive(personal)) {
				throw { message: "personal is inactive", statusCode: StatusCodes.BAD_REQUEST }
			}
			extraParams.firstName = personal.Nombre
			extraParams.lastName = personal.Apellido
		}
		return createJWT(userDb, extraParams)
	} else {
		invalidUsernameOrPassword()
	}
};

export const changePassword = async (currentPassword, newPassword, user) => {
	const userDb = await Usuarios.scope(null).findOne({ where: { Usuario: user.username } });
	const match = await bcrypt.compare(currentPassword, userDb.Password);
	if (!match) {
		invalidUsernameOrPassword()
	}
	userDb.Password = await hashPassword(newPassword);
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
	const users = await Usuarios.findAll({ 
		include: [{model:Personal, as: "personal"}, {model:Perfil, as: "perfil"}],
	})
	return users.map(user => user.get({ plain: true }))
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