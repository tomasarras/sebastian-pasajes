import { DataTypes } from 'sequelize';

const parametros = (sequelize) => {
  const Parametros = sequelize.define('Parametros', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RazonSocial: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "RazonSocial"
    },
    CUIT: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      field: "CUIT"
    },
    NombreFantasia: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "NombreFantasia"
    },
    Direccion: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    IdLocalidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "IdLocalidad"
    },
    Provincia: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    CP: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      field: "CP"
    },
    EMail: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "EMail"
    },
    EMail2: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "EMail2"
    },
    Pagina: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    Telefono: {
      type: DataTypes.CHAR(50),
      allowNull: false
    }
  }, {
    tableName: 'parametros',
    timestamps: false,
    indexes: [
      {
        fields: ['IdLocalidad']
      }
    ]
  });

  return Parametros;
};

export default parametros;
