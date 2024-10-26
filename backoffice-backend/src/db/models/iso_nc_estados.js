import { DataTypes } from 'sequelize';

const isoNcEstado = (sequelize) => {
  const IsoNcEstado = sequelize.define('IsoNcEstado', {
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
    tableName: 'iso_nc_estados',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNcEstado;
};

export default isoNcEstado;
