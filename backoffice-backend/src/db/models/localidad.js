import { DataTypes } from 'sequelize';

const localidad = (sequelize) => {
  const Localidad = sequelize.define('Localidad', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true 
    },
    CP: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      field: "CP"
    },
    IdPcia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "IdPcia"
    }
  }, {
    tableName: 'localidades',
    timestamps: false
  });

  return Localidad;
};

export default localidad;
