import Sequelize, { DataTypes } from 'sequelize';

const cliente = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
      field: "FechaAlta"
    },
    FechaBaja: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('0000-00-00'),
      field: "FechaBaja"
    },
    TipoIdentificacion: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field: "TipoIdentificacion"
    },
    Identificacion: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      unique: true
    },
    Nombre: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true
    },
    Apellido: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    Direccion: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    IdLocalidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdLocalidad"
    },
    Provincia: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    CP: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      field: "CP"
    },
    Email: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    IdActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdActividad"
    },
    Obs: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    IdIva: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdIva"
    }
  }, {
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};

export default cliente;
