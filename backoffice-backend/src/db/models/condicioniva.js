import { DataTypes } from 'sequelize';

const condicionIva = (sequelize) => {
  const CondicionIva = sequelize.define('CondicionIva', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true  // Clave única
    },
    TipoRI: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: "TipoRI"
    }
  }, {
    tableName: 'condicioniva',
    timestamps: false
  });

  return CondicionIva;
};

export default condicionIva;
