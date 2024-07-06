import { DataTypes } from 'sequelize';

const clientGroup = (sequelize) => {
  const ClientGroup = sequelize.define('ClientGroup', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'client_group',
    timestamps: false,
    underscored: true,
  });

  return ClientGroup;
};

export default clientGroup;
