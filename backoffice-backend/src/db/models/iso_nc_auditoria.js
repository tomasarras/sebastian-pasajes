import { DataTypes } from 'sequelize';

const isoNcAuditoria = (sequelize) => {
  const IsoNcAuditoria = sequelize.define('IsoNcAuditoria', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    IdNC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdNC'
    },
    IdUsuario: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      field: 'IdUsuario'
    },
    IdCambio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdCambio'
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00',
    },
  }, {
    tableName: 'iso_nc_auditoria',
    timestamps: false,
    charset: 'utf8',
    rowFormat: 'COMPACT'
  });

  return IsoNcAuditoria;
};

export default isoNcAuditoria;
