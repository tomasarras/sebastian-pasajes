import { DataTypes } from 'sequelize';

const isoEncTurr = (sequelize) => {
  const IsoEncTurr = sequelize.define('IsoEncTurr', {
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
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"IdPersonal"
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Ruta: {
      type: DataTypes.CHAR(50),
      allowNull: false
    }
  }, {
    tableName: 'iso_enc_turr',
    timestamps: false,
    indexes: [
      {
        fields: ['IdPersonal']
      }
    ]
  });

  return IsoEncTurr;
};

export default isoEncTurr;