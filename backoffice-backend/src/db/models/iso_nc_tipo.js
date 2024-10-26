import { DataTypes } from 'sequelize';

const isoNcTipo = (sequelize) => {
  const IsoNcTipo = sequelize.define('IsoNcTipo', {
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
    tableName: 'iso_nc_tipo',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNcTipo;
};

export default isoNcTipo;
