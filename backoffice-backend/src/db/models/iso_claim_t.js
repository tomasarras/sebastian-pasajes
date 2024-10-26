import { DataTypes } from 'sequelize';

const isoReclamost = (sequelize) => {
  const IsoReclamost = sequelize.define('IsoReclamost', {
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
      field: 'IdPersonal'
    },
    Cliente: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    IdProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdProveedor'
    },
    NFA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'NFA'
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
    tableName: 'iso_reclamost',
    timestamps: false
  });

  return IsoReclamost;
};

export default isoReclamost;