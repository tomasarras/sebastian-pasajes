import { DataTypes } from 'sequelize';

const isoDocEstados = (sequelize) => {
  const IsoDocEstados = sequelize.define('IsoDocEstados', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'iso_doc_estados',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Nombre']
      }
    ]
  });

  return IsoDocEstados;
};

export default isoDocEstados;