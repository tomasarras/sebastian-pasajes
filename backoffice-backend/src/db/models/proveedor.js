import { DataTypes } from 'sequelize';

const proveedor = (sequelize) => {
  const Proveedor = sequelize.define('Proveedor', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: "FechaAlta"
    },
    FechaBaja: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: "FechaBaja"
    },
    TipoIdentificacion: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      field: "TipoIdentificacion"
    },
    Identificacion: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      field: "Identificacion"
    },
    CBU: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "CBU"
    },
    Nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true
    },
    Apellido: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true
    },
    EMail: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: "EMail"
    }
  }, {
    tableName: 'proveedores',
    timestamps: false
  });

  return Proveedor;
};

export default proveedor;
