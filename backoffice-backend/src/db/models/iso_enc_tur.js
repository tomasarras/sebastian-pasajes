import { DataTypes } from 'sequelize';

const isoEncTur = (sequelize) => {
  const IsoEncTur = sequelize.define('IsoEncTur', {
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
    Cliente: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    TipoE: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"TipoE"
    },
    IdPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"IdPersonal"
    },
    Reserva: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    R1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R1"
    },
    R2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R2"
    },
    R2A: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      field:"R2A"
    },
    R3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R3"
    },
    R3O: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      field:"R3O"
    },
    R4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R4"
    },
    R4H: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      field:"R4H"
    },
    R5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R5"
    },
    R6: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"R6"
    },
    R7: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"R7"
    },
    R8: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R8"
    },
    R9: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"R9"
    },
    R10: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R10"
    },
    R11: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R11"
    },
    R12: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R12"
    },
    R13: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R13"
    },
    R14: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R14"
    },
    R15: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"R15"
    },
    R16: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"R16"
    }
  }, {
    tableName: 'iso_enc_tur',
    timestamps: false,
    indexes: [
      {
        fields: ['IdPersonal']
      }
    ]
  });

  return IsoEncTur;
};

export default isoEncTur;