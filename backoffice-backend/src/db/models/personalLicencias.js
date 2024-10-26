import { DataTypes } from 'sequelize';

const personalLicencias = (sequelize) => {
  const PersonalLicencias = sequelize.define('PersonalLicencias', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'IdPersonal'
    },
    IdLic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'IdLic'
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    IdEstado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:'IdEstado',
      get() {
        const value = this.getDataValue('IdEstado');
        return value === 1 ? 'Aprobado' : 'Solicitado'
      }
    }
  }, {
    tableName: 'personal_licencias',
    timestamps: false,
    indexes: [
      {
        fields: ['IdPersonal']
      },
      {
        fields: ['IdLic']
      }
    ]
  });

  return PersonalLicencias;
};

export default personalLicencias;