import { DataTypes } from 'sequelize';

const isoTr = (sequelize) => {
  const IsoTr = sequelize.define('IsoTr', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdCliente'
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    Hora1: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00',
      field: 'Hora1'
    },
    Hora2: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00',
      field: 'Hora2'
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdPersonal'
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'iso_tr',
    timestamps: false
  });

  return IsoTr;
};

export default isoTr;