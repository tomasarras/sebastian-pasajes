import { DataTypes } from 'sequelize';

const isoEncIssn = (sequelize) => {
  const IsoEncIssn = sequelize.define('IsoEncIssn', {
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
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:"IdCliente"
    },
    TR: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"TR"
    },
    TRObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"TRObs"
    },
    ASE: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"ASE"
    },
    ASEObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"ASEObs"
    },
    SG: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SG"
    },
    SGObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"SGObs"
    },
    SGP: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SGP"
    },
    SGPObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"SGPObs"
    },
    SAT: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SAT"
    },
    SATObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"SATObs"
    },
    OpiObs: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:"OpiObs"
    }
  }, {
    tableName: 'iso_enc_issn',
    timestamps: false,
    indexes: [
      {
        fields: ['IdCliente']
      }
    ]
  });

  return IsoEncIssn;
};

export default isoEncIssn;