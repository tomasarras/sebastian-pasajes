import Sequelize, { DataTypes } from 'sequelize';

const personal = (sequelize) => {
  const Personal = sequelize.define('Personal', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
      field:"FechaAlta"
    },
    FechaBaja: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
      field:"FechaBaja"
    },
    TipoIdentificacion: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field:"TipoIdentificacion"
    },
    Identificacion: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      unique: true
    },
    TipoDocumento: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field:"TipoDocumento"
    },
    Documento: {
      type: DataTypes.CHAR(13),
      allowNull: false
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    Apellido: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    EMail: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "EMail"
    },
    IdPuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"IdPuesto"
    }
  }, {
    tableName: 'personal',
    timestamps: false
  });

  return Personal;
};

export default personal;
