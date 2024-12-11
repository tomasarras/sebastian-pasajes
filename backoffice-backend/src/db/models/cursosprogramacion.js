import { DataTypes } from 'sequelize';

const cursosProgramacion = (sequelize) => {
  const CursosProgramacion = sequelize.define('CursosProgramacion', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdPersonal: {
      field:"IdPersonal",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdCurso: {
      field:"IdCurso",
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
    Evaluacion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Observaciones: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IdEstado: {
      field:"IdEstado",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VE: {
      field:"VE",
      type: DataTypes.TINYINT,
      allowNull: false
    },
    FechaVE: {
      field: "FechaVE",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    ObsVE: {
      field: "ObsVE",
      type: DataTypes.TEXT,
      allowNull: false
    },
    Hora: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00'
    }
  }, {
    tableName: 'cursosprogramacion',
    timestamps: false,
    charset: 'latin1'
  });

  return CursosProgramacion;
};

export default cursosProgramacion