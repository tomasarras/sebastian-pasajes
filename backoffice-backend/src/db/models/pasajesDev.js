import { DataTypes } from 'sequelize';

const pasajesDev = (sequelize) => {
  const PasajesDev = sequelize.define('PasajesDev', {
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
    Nro: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    Pasajero: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    Imp1: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Imp1"
    },
    Imp2: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Imp2"
    },
    W: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      get() {
        const value = this.getDataValue('Estado');
        return value === 1 ? "PENDIENTE" : "APROBADO"
      }
    },
    Obs: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdPersonal"
    }
  }, {
    tableName: 'pasajesdev',
    timestamps: false,
    indexes: [
      {
        fields: ['IdPersonal']
      }
    ]
  });

  return PasajesDev;
};

export default pasajesDev;
