import { DataTypes } from 'sequelize';

const isoMinutas = (sequelize) => {
  const IsoMinutas = sequelize.define('IsoMinutas', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    Hora: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00'
    },
    Nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'iso_minutas',
    timestamps: false
  });

  return IsoMinutas;
};

export default isoMinutas;