import { DataTypes } from 'sequelize';

const province = (sequelize) => {
  const Province = sequelize.define('Province', {
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
    tableName: 'province',
    timestamps: false,
    underscored: true,
  });
  return Province;
};

export default province;
