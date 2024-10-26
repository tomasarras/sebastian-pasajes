import { DataTypes } from 'sequelize';

const isoRg = (sequelize) => {
  const IsoRg = sequelize.define('IsoRg', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdPersonal'
    },
    Recibio: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    ObsCli: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      field: 'ObsCli'
    },
    ObsMot: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      field: 'ObsMot'
    },
    Cancela: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    C1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C1'
    },
    C2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C2'
    },
    C3: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C3'
    },
    C4: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C4'
    },
    C5: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C5'
    },
    C6: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C6'
    },
    C7: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C7'
    },
    C8: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C8'
    },
    C9: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C9'
    },
    C10: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C10'
    },
    C11: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C11'
    },
    C12: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C12'
    },
    C13: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C13'
    },
    C14: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'C14'
    },
    M1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'M1'
    },
    M2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'M2'
    },
    M3: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'M3'
    },
    M4: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'M4'
    },
    M5: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'M5'
    }
  }, {
    tableName: 'iso_rg',
    timestamps: false
  });

  return IsoRg;
};

export default isoRg;