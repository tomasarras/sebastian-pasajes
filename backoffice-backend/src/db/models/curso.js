import { DataTypes } from 'sequelize';

const curso = (sequelize) => {
  const Curso = sequelize.define('Curso', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Titulo: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    Temario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Sector: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Tipo: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    FechaAlta: {
      field:"FechaAlta",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    FechaBaja: {
      field:"FechaBaja",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    Teorico: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Practico: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Evaluacion: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Duracion: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    Comentarios: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    TipoP: {
      field:"TipoP",
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    Costo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IdTema: {
      field:"IdTema",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cursos',
    timestamps: false,
    charset: 'latin1'
  });

  return Curso;
};

export default curso