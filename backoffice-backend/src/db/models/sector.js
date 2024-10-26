import { DataTypes } from 'sequelize';

const sector = (sequelize) => {
  const Sector = sequelize.define('Sector', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'sector',
    timestamps: false,
    charset: 'utf8',
    collate: 'latin1_swedish_ci',
    rowFormat: 'COMPACT'
  });

  return Sector;
};

export default sector;
