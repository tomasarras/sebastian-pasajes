import { DataTypes } from 'sequelize';

const user = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      field: 'last_name'
    },
    documentType: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      field: 'document_type'
    },
    document: {
      type: DataTypes.CHAR(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    phones: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    username: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'client_id'
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'profile_id'
    },
    inactive: {
      type: DataTypes.TINYINT,
      allowNull: false,
    }
  }, {
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: 'ind_user_client_id',
        fields: ['client_id'],
      },
      {
        name: 'ind_user_profile_id',
        fields: ['profile_id'],
      }
    ],
    underscored: true,
  });

  return User;
};

export default user;
