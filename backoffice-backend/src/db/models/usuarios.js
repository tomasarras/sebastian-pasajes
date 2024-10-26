import { DataTypes } from 'sequelize';

const usuarios = (sequelize) => {
  const Usuarios = sequelize.define('Usuarios', {
    Usuario: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    Puesto: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    IdPerfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "IdPerfil"
    },
    Tipo: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "IdPersonal"
    },
    FechaBaja: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: "FechaBaja"
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['Password'] }
    }
  });

  return Usuarios;
};

export default usuarios;
