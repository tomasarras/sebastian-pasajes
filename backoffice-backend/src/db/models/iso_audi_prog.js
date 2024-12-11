import { DataTypes } from 'sequelize';

const isoAudiProg = (sequelize) => {
  const IsoAudiProg = sequelize.define('IsoAudiProg', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdSector: {
      field: "IdSector",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FechaProg: {
        field: "FechaProg",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    FechaReal: {
        field: "FechaReal",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IdEstado: {
        field: "IdEstado",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HoraReal: {
        field: "HoraReal",
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00'
    },
    Duracion: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00'
    },
    Obj: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Codigo: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    IdPersonal1: {
        field: "IdPersonal1",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Fecha1: {
        field: "Fecha1",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    Informe: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Ruta: {
      type: DataTypes.CHAR(50),
      allowNull: false
    }
  }, {
    tableName: 'iso_audi_prog',
    timestamps: false,
    charset: 'utf8'
  });

  return IsoAudiProg;
};

export default isoAudiProg;
