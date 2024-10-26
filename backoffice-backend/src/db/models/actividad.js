import { DataTypes } from 'sequelize';

const actividad = (sequelize) => {
  const Actividad = sequelize.define('Actividad', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true  // Clave única
    }
  }, {
    tableName: 'actividades',
    timestamps: false
  });

  return Actividad;
};

export default actividad;
