import { DataTypes } from 'sequelize';

const isoEvalAdm = (sequelize) => {
  const IsoEvalAdm = sequelize.define('IsoEvalAdm', {
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
      allowNull: false
    },
    Obs2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    C1: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C2: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C3: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C4: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C5: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C6: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C7: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C8: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C9: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C10: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C11: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    C12: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    O1: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O2: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O3: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O4: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O5: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O6: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O7: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O8: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O9: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O10: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O11: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    O12: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E1: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E2: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E3: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E4: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E5: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E6: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E7: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E8: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E9: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E10: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    E11: {
      type: DataTypes.CHAR(200),
      allowNull: false
    }
  }, {
    tableName: 'iso_evaladm',
    timestamps: false
  });

  return IsoEvalAdm;
};

export default isoEvalAdm;