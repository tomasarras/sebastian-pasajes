import { DataTypes } from 'sequelize';

const isoEncCor = (sequelize) => {
  const IsoEncCor = sequelize.define('IsoEncCor', {
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
    AVI1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"AVI1"
    },
    AVI2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"AVI2"
    },
    AVI3: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"AVI3"
    },
    AVI4: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"AVI4"
    },
    AVIObs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"AVIObs"
    },
    VI: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"VI"
    },
    VID: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"VID"
    },
    VIDObs: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:"VIDObs"
    },
    SH: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SH"
    },
    SHObs: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:"SHObs"
    },
    SH1: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SH1"
    },
    SH1Obs: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field:"SH1Obs"
    },
    SH2: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field:"SH2"
    },
    OpiObs: {
      type: DataTypes.TEXT,
      allowNull: false,
      field:"OpiObs"
    }
  }, {
    tableName: 'iso_enc_cor',
    timestamps: false,
    indexes: [
      {
        fields: ['IdCliente']
      }
    ]
  });

  return IsoEncCor;
};

export default isoEncCor;