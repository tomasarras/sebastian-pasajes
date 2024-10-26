import { DataTypes } from 'sequelize';

const licenciasTipo = (sequelize) => {
  const LicenciasTipo = sequelize.define('LicenciasTipo', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'licencias_tipo',
    timestamps: false
  });

  return LicenciasTipo;
};

export default licenciasTipo;