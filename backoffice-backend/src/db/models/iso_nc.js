import { DataTypes } from 'sequelize';

const isoNc = (sequelize) => {
  const IsoNc = sequelize.define('IsoNc', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NroNC: {
        field: "NroNC",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    IdTipo: {
        field: "IdTipo",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdOrigen: {
        field: "IdOrigen",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    IdEmisor: {
        field: "IdEmisor",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdRDet: {
        field: "IdRDet",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Causa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IdRCausa: {
        field: "IdRCausa",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Accion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IdRAccion: {
        field: "IdRAccion",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdRVA: {
        field: "IdRVA",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdRVEF: {
        field: "IdRVEF",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FechaA: {
        field: "FechaA",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    FechaVA: {
        field: "FechaVA",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    FechaVEF: {
        field: "FechaVEF",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    IdEstado: {
        field: "IdEstado",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'iso_nc',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNc;
};

export default isoNc;
