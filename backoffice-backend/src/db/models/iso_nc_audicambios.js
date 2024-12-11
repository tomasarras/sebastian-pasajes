import { DataTypes } from 'sequelize';

const isoNcAudicambios = (sequelize) => {
  const IsoNcAudicambios = sequelize.define('IsoNcAudicambios', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'iso_nc_audicambios',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNcAudicambios;
};

export default isoNcAudicambios;
