import config from "../config.js";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslConfig = config.db.sslConnection ? {
  dialectOptions: {
    encrypt: true,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  ssl: true,
} : {};

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  ...sslConfig,
  operatorsAliases: "0",
  //logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle,
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
const modelsFileNames = await fs.promises.readdir(path.join(__dirname, "/models"));
const onlyJsFileNames = modelsFileNames.filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
for (const modelName of onlyJsFileNames) {
  const filePath = "file://" + path.join(__dirname, "/models", modelName);
  const model = await import(filePath);
  modelDefiners.push(model.default);
}

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//Relaciones
const { User, } = sequelize.models;

export {
  sequelize,
  User,
};