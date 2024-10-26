import { DataTypes } from 'sequelize';

const isoProcesos = (sequelize) => {
  const IsoProcesos = sequelize.define('IsoProcesos', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false
    }
  }, {
    tableName: 'iso_procesos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Nombre']
      }
    ]
  });

  return IsoProcesos;
};

export default isoProcesos;