import { DataTypes } from 'sequelize';

const opagoEstado = (sequelize) => {
  const OpagoEstado = sequelize.define('OpagoEstado', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'opagoestado',
    timestamps: false
  });

  return OpagoEstado;
};

export default opagoEstado;
