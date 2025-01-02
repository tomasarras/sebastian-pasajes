import { DataTypes } from 'sequelize';

const passenger = (sequelize) => {
  const Passenger = sequelize.define('Passenger', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      field: 'email'
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'last_name'
    },
    documentType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'document_type'
    },
    document: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phones: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '0000-00-00',
      field: 'registration_date'
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id'
    }
  }, {
    tableName: 'passenger',
    timestamps: false,
    underscored: true,
  });

  return Passenger;
};

export default passenger;
