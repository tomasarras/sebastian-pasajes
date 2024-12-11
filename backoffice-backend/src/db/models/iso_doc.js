import { DataTypes } from 'sequelize';

const isoDoc = (sequelize) => {
  const IsoDoc = sequelize.define('IsoDoc', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Codigo: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      unique: 'CodigoVersion',
    },
    Nombre: {
      type: DataTypes.CHAR(200),
      allowNull: false,
    },
    Version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'CodigoVersion',
    },
    IdSector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdSector',
    },
    IdTipoDoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdTipoDoc',
    },
    Origen: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    Ruta: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    FechaCRE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaCRE',
    },
    FechaCON: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaCON',
    },
    FechaAPR: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaAPR',
    },
    FechaEXP: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaEXP',
    },
    ComentCRE: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'FechaCRE',
    },
    IdEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdEstado',
    },
    FlagOrig: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'FlagOrig',
    },
    FlagRev: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'FlagRev',
    },
    Editable: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    IdProc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdProc',
    },
  }, {
    tableName: 'iso_doc',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Nombre']
      }
    ]
  });

  return IsoDoc;
};

export default isoDoc;