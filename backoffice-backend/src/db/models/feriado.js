import { DataTypes } from 'sequelize';

const feriados = (sequelize) => {
  const Feriados = sequelize.define('Feriados', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      unique: 'uniqueFechaNombre'
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'uniqueFechaNombre'
    }
  }, {
    tableName: 'feriados',
    timestamps: false
  });

  return Feriados;
};

export default feriados;