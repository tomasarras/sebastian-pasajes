import unixCrypt from 'unix-crypt-td-js';
import config from "../config.js"
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuarios, Personal, Perfil } from "../db/index.js"
import { toLowerCaseRelations } from '../utils/functions.js';
import { USER_PROFILES_IDS, USER_PROFILES_NAMES } from '../utils/constants.js';
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
	const userByUsename = await Usuarios.findOne({where: { usuario: username } })
	if (userByUsename)
		throw { message: `user with username ${username} already exists`, statusCode: StatusCodes.BAD_REQUEST }
}

export const login = async (username, password) => {
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
			username: userDb.Usuario,
			idPerfil: IdPerfil,
			idPersonal: IdPersonal,
			role: USER_PROFILES_IDS[IdPerfil]
		}
		if (Tipo == 'PERSONAL') {
			const personal = await Personal.findByPk(IdPersonal)
			if (isInactive(personal)) {
				throw { message: "personal is inactive", statusCode: StatusCodes.BAD_REQUEST }
			}
			extraParams.firstName = personal.Nombre
			extraParams.lastName = personal.Apellido
			extraParams.personal = { id: personal.Id }
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
	await checkUsernameAvailable(userParam.Usuario)
	userParam.Password = await hashPassword(userParam.Password);
	userParam.IdPerfil = USER_PROFILES_NAMES[userParam.Perfil]
	delete userParam.Perfil
	let user = await Usuarios.create(userParam)
	const plain = user.get({ plain: true })
	delete plain.Password
	return plain
};

export const changePasswordAsAdmin = async (newPassword, username) => {
	const userDb = await Usuarios.findOne({ where: { Usuario: username } });
	userDb.Password = await hashPassword(newPassword);
	await userDb.save();
};

export const getAll = async () => {
	const users = await Usuarios.findAll({ where: { Usuario: {[Op.ne]: 'admin' }},
		include: [{model:Personal, as: "personal"}, {model:Perfil, as: "perfil"}],
	})
	return users.map(user => { 
		const plain = user.get({ plain: true })
		delete plain.Password
		return plain
	})
};

export const deleteByUsername = async (username) => {
	const user = await Usuarios.findOne({ where: { Usuario: username }})
	user.FechaBaja = new Date();
	await user.save()
	return user.get({plain:true})
};