import { DataTypes } from 'sequelize';

const isoReclamosc = (sequelize) => {
  const IsoReclamosc = sequelize.define('IsoReclamosc', {
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
      field:'IdPersonal'
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'IdCliente'
    },
    IdProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'IdProveedor'
    },
    NFA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'NFA'
    },
    Des: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Ana: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Acc: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'iso_reclamosc',
    timestamps: false
  });

  return IsoReclamosc;
};

export default isoReclamosc;