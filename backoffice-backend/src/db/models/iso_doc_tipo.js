import { DataTypes } from 'sequelize';

const isoDocTipo = (sequelize) => {
  const IsoDocTipo = sequelize.define('IsoDocTipo', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false
    }
  }, {
    tableName: 'iso_doc_tipo',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Nombre']
      }
    ]
  });

  return IsoDocTipo;
};

export default isoDocTipo;