import { DataTypes } from 'sequelize';

const status = (sequelize) => {
  const Status = sequelize.define('Status', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    reservedName: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 'status',
    timestamps: false,
    underscored: true,
  });

  return Status;
};

export default status;
