import { DataTypes } from 'sequelize';

const personalLicxAnio = (sequelize) => {
  const PersonalLicxAnio = sequelize.define('PersonalLicxAnio', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdPersonal"
    },
    Año: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Dias: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'personal_licxanio',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['IdPersonal', 'Año']
      },
      {
        fields: ['IdPersonal']
      }
    ]
  });

  return PersonalLicxAnio;
};

export default personalLicxAnio;
