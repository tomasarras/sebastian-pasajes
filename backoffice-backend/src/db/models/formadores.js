import { DataTypes } from 'sequelize';

const formadores = (sequelize) => {
  const Formadores = sequelize.define('Formadores', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaAlta'
    },
    FechaBaja: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'FechaBaja'
    },
    TipoIdentificacion: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field: 'TipoIdentificacion'
    },
    Identificacion: {
      type: DataTypes.CHAR(13),
      allowNull: false
    },
    TipoDocumento: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field: 'TipoDocumento'
    },
    Documento: {
      type: DataTypes.CHAR(13),
      allowNull: false
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    Apellido: {
      type: DataTypes.CHAR(30),
      allowNull: false
    }
  }, {
    tableName: 'formadores',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Nombre', 'Apellido']
      }
    ]
  });

  return Formadores;
};

export default formadores;