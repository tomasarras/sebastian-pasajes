import { DataTypes } from 'sequelize';

const isoDocDist = (sequelize) => {
  const IsoDocDist = sequelize.define('IsoDocDist', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    IdDoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdDoc",
    },
    IdPuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdPuesto",
    },
  }, {
    tableName: 'iso_doc_dist',
    timestamps: false
  });

  return IsoDocDist;
};

export default isoDocDist;