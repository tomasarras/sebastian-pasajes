import { DataTypes } from 'sequelize';

const location = (sequelize) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'postal_code'
    },
    provinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'province_id'
    }
  }, {
    tableName: 'location',
    timestamps: false,
    underscored: true,
  });
  return Location;
};

export default location;
