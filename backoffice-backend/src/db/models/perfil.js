import { DataTypes } from 'sequelize';

const perfil = (sequelize) => {
  const Perfil = sequelize.define('Perfil', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'perfiles',
    timestamps: false,
    charset: 'utf8'
  });

  return Perfil;
};

export default perfil;
