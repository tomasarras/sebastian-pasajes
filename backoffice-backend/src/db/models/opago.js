import Sequelize, { DataTypes } from 'sequelize';

const opago = (sequelize) => {
  const Opago = sequelize.define('Opago', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
    },
    FechaP: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
      field: "FechaP"
    },
    IdEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdEstado"
    },
    Cliente: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    Importe: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Moneda: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    IdOperador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdOperador"
    },
    IdUsuario: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      field: "IdUsuario"
    },
    Des: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    NFA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "NFA"
    },
    NFO: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      field: "NFO"
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdPersonal"
    }
  }, {
    tableName: 'opago',
    timestamps: false
  });

  return Opago;
};

export default opago;
