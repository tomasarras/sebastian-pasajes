import { DataTypes } from 'sequelize';

const isoCriterios = (sequelize) => {
  const IsoCriterios = sequelize.define('IsoCriterios', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Cod: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    Nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'iso_criterios',
    timestamps: false
  });

  return IsoCriterios;
};

export default isoCriterios;