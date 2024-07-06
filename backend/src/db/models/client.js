import { DataTypes } from 'sequelize';

const client = (sequelize) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'business_name'
    },
    bookCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'book_code'
    },
    cuit: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'location_id'
    },
    province: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'postal_code'
    },
    phones: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nextBookCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'next_book_code'
    },
    action: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    immediate: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'group_id'
    },
    mailAuto: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'mail_auto'
    }
  }, {
    tableName: 'client',
    timestamps: false,
    underscored: true,
  });

  return Client;
};

export default client;
