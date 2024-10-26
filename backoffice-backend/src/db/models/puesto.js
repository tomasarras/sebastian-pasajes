import { DataTypes } from 'sequelize';

const puesto = (sequelize) => {
  const Puesto = sequelize.define('Puesto', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'puestos',
    timestamps: false,
    charset: 'utf8'
  });

  return Puesto;
};

export default puesto;
