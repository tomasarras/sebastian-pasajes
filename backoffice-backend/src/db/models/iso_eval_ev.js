import { DataTypes } from 'sequelize';

const isoEvalEv = (sequelize) => {
  const IsoEvalEv = sequelize.define('IsoEvalEv', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdPersonal1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdPersonal1'
    },
    IdPersonal2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdPersonal2'
    },
    IdPuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'IdPuesto'
    },
    Fecha1: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'Fecha1'
    },
    Fecha2: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'Fecha2'
    },
    Obs1: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'Obs1'
    },
    Obs2: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'Obs2'
    },
    C1: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C1'
    },
    C2: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C2'
    },
    C3: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C3'
    },
    C4: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C4'
    },
    C5: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C5'
    },
    C6: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C6'
    },
    C7: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C7'
    },
    C8: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C8'
    },
    C9: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C9'
    },
    C10: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C10'
    },
    C11: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C11'
    },
    C12: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'C12'
    },
    O1: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O1'
    },
    O2: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O2'
    },
    O3: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O3'
    },
    O4: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O4'
    },
    O5: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O5'
    },
    O6: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O6'
    },
    O7: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O7'
    },
    O8: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O8'
    },
    O9: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O9'
    },
    O10: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O10'
    },
    O11: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O11'
    },
    O12: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      field: 'O12'
    }
  }, {
    tableName: 'iso_evalev',
    timestamps: false
  });

  return IsoEvalEv;
};

export default isoEvalEv;
