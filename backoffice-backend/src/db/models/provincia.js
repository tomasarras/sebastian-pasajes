import { DataTypes } from 'sequelize';

const provincia = (sequelize) => {
  const Provincia = sequelize.define('Provincia', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'provincias',
    timestamps: false,
    charset: 'utf8'
  });

  return Provincia;
};

export default provincia;
