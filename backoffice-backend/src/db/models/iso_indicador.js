import { DataTypes } from 'sequelize';

const isoIndicadores = (sequelize) => {
  const IsoIndicadores = sequelize.define('IsoIndicadores', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Año: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    FechaA: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field:"FechaA"
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'iso_indicadores',
    timestamps: false
  });

  return IsoIndicadores;
};

export default isoIndicadores;