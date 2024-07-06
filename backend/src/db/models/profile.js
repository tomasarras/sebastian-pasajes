import { DataTypes } from 'sequelize';

const profile = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(30),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(32),
    }
  }, {
    tableName: 'profile',
    collate: 'utf8_general_ci',
    timestamps: false,
    indexes: [
      {
        name: 'ind_profile_name',
        unique: true,
        fields: ['name'],
      }
    ],
    underscored: true,
  });

  return Profile;
};

export default profile;
