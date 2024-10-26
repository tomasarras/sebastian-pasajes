import { DataTypes } from 'sequelize';

const isoNcOrigen = (sequelize) => {
  const IsoNcOrigen = sequelize.define('IsoNcOrigen', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'iso_nc_origen',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNcOrigen;
};

export default isoNcOrigen;
