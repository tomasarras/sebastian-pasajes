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
const { Usuarios, Provincia, Sector, Personal, Perfil, Puesto, Noticia, Cliente, Localidad, Actividad, CondicionIva, Opago, Proveedor, OpagoEstado,
  IsoNc,IsoNcTipo, IsoNcOrigen, IsoNcEstado, IsoAudiProg, Curso, CursoTemas, IsoEvalEv, IsoEvalEvc, IsoEvalAdm, IsoIndicadores, IsoMinutas, IsoReclamosc, IsoReclamost,
  IsoRg, IsoTr, IsoCriterios, Formadores, IsoDocTipo, IsoProcesos, IsoEncCor, IsoEncIssn, IsoEncTur, IsoEncTurr, PasajesDev, PersonalLicencias, LicenciasTipo,
  Feriados, PersonalLicxAnio, Parametros } = sequelize.models;
Cliente.belongsTo(Localidad, { foreignKey: 'IdLocalidad', as: 'localidad' });
Cliente.belongsTo(Actividad, { foreignKey: 'IdActividad', as: 'actividad' });
Cliente.belongsTo(CondicionIva, { foreignKey: 'IdIva', as: 'condicionIva' });
Localidad.hasMany(Cliente, { foreignKey: 'IdLocalidad', as: 'clientes' });
Actividad.hasMany(Cliente, { foreignKey: 'IdActividad', as: 'clientes' });
CondicionIva.hasMany(Cliente, { foreignKey: 'IdIva', as: 'clientes' });

Curso.belongsTo(CursoTemas, { foreignKey: 'IdTema', as: 'tema' })
Curso.belongsTo(Sector, { foreignKey: 'Sector', as: 'sector' })
Localidad.belongsTo(Provincia, { foreignKey: 'IdPcia', as: 'provincia' })
Provincia.hasMany(Localidad, { foreignKey: 'IdPcia', as: 'localidades' })
Usuarios.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'personal' })
Usuarios.belongsTo(Perfil, { foreignKey: 'IdPerfil', as: 'perfil' })
Personal.belongsTo(Puesto, { foreignKey: 'IdPuesto', as: 'puesto' });
Opago.belongsTo(OpagoEstado, { foreignKey: 'IdEstado', as: 'estado' });
Opago.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'personal' });
Opago.belongsTo(Proveedor, { foreignKey: 'IdOperador', as: 'operador' });
Opago.belongsTo(Usuarios, { foreignKey: 'IdUsuario', as: 'usuario' });
Proveedor.hasMany(Opago, { foreignKey: 'IdOperador', as: 'opagos' });
OpagoEstado.hasMany(Opago, { foreignKey: 'IdEstado', as: 'opagos' });

IsoNc.belongsTo(IsoNcTipo, { foreignKey: 'IdTipo', as: 'tipo' })
IsoNc.belongsTo(IsoNcOrigen, { foreignKey: 'IdOrigen', as: 'origen' })
IsoNc.belongsTo(IsoNcEstado, { foreignKey: 'IdEstado', as: 'estado' })
IsoNc.belongsTo(Personal, { foreignKey: 'IdEmisor', as: 'emisor' });
IsoNc.belongsTo(Personal, { foreignKey: 'IdRDet', as: 'det' });
IsoNc.belongsTo(Personal, { foreignKey: 'IdRCausa', as: 'causa' });
IsoNc.belongsTo(Personal, { foreignKey: 'IdRAccion', as: 'accion' });
IsoNc.belongsTo(Personal, { foreignKey: 'IdRVA', as: 'va' });
IsoNc.belongsTo(Personal, { foreignKey: 'IdRVEF', as: 'vef' });
IsoAudiProg.belongsTo(Sector, { foreignKey: 'IdSector', as: 'sector' });
IsoEvalEv.belongsTo(Personal, { foreignKey: 'IdPuesto', as: 'puesto' })
IsoEvalEv.belongsTo(Puesto, { foreignKey: 'IdPuesto', as: 'isoEvalPuesto' })
IsoEvalEv.belongsTo(Personal, { foreignKey: 'IdPersonal1', as: 'personal1' })
IsoEvalEv.belongsTo(Personal, { foreignKey: 'IdPersonal2', as: 'personal2' })
IsoEvalEvc.belongsTo(Puesto, { foreignKey: 'IdPuesto', as: 'isoEvalEvcPuesto' })
IsoEvalEvc.belongsTo(Personal, { foreignKey: 'IdPersonal1', as: 'isoEvalEvcPersonal1' })
IsoEvalEvc.belongsTo(Personal, { foreignKey: 'IdPersonal2', as: 'isoEvalEvcPersonal2' })
IsoEvalAdm.belongsTo(Puesto, { foreignKey: 'IdPuesto', as: 'isoEvalAdmPuesto' })
IsoEvalAdm.belongsTo(Personal, { foreignKey: 'IdPersonal1', as: 'isoEvalAdmPersonal1' })
IsoEvalAdm.belongsTo(Personal, { foreignKey: 'IdPersonal2', as: 'isoEvalAdmPersonal2' })
IsoReclamosc.belongsTo(Cliente, { foreignKey: 'IdCliente', as: 'isoReclamoscCliente' })
IsoReclamosc.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoReclamoscPersonal' })
IsoReclamosc.belongsTo(Proveedor, { foreignKey: 'IdProveedor', as: 'isoReclamoscProveedor' })
IsoReclamost.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoReclamostPersonal' })
IsoReclamost.belongsTo(Proveedor, { foreignKey: 'IdProveedor', as: 'isoReclamostProveedor' })
IsoRg.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoRgPersonal' })
IsoTr.belongsTo(Cliente, { foreignKey: 'IdCliente', as: 'isoTrCliente' })
IsoTr.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoTrPersonal' })
IsoEncCor.belongsTo(Cliente, { foreignKey: 'IdCliente', as: 'isoEncCorCliente' })
IsoEncIssn.belongsTo(Cliente, { foreignKey: 'IdCliente', as: 'isoEncIssnCliente' })
IsoEncTur.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoEncTurPersonal' })
IsoEncTurr.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'isoEncTurrPersonal' })
PasajesDev.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'pasajesDevPersonal' })
PersonalLicencias.belongsTo(Personal, { foreignKey: 'IdPersonal', as: 'personalLicenciasPersonal' })
PersonalLicencias.belongsTo(LicenciasTipo, { foreignKey: 'IdLic', as: 'personalLicenciasPersonalTipo' })

export {
  sequelize,
  Usuarios,
  Perfil,
  Personal,
  Noticia,
  Cliente,
  Localidad,
  Actividad,
  CondicionIva,
  Opago,
  OpagoEstado,
  Proveedor,
  Puesto,
  Provincia,
  Sector,
  IsoNc,
  IsoNcTipo,
  IsoNcOrigen,
  IsoNcEstado,
  IsoAudiProg,
  Curso,
  CursoTemas,
  IsoEvalEv,
  IsoEvalEvc,
  IsoEvalAdm,
  IsoIndicadores,
  IsoMinutas,
  IsoReclamosc,
  IsoReclamost,
  IsoRg,
  IsoTr,
  IsoCriterios,
  Formadores,
  IsoDocTipo,
  IsoProcesos,
  IsoEncCor,
  IsoEncIssn,
  IsoEncTur,
  IsoEncTurr,
  PasajesDev,
  PersonalLicencias,
  LicenciasTipo,
  Feriados,
  PersonalLicxAnio,
  Parametros,
};