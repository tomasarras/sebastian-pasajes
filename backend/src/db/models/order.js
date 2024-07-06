import { DataTypes } from 'sequelize';

const order = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id'
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'registration_date'
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    derivations: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'status_id'
    },
    applicantUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'applicant_user_id'
    },
    authorizerUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'authorizer_user_id'
    },
    agentUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'agent_user_id'
    },
    authorizeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '0000-00-00',
      field: 'authorize_date'
    },
    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '0000-00-00',
      field: 'target_date'
    },
    companies: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    tickets: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '0000-00-00',
      field: 'issue_date'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    passengerType: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'passenger_type'
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(20),
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
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phones: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    transportType: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'transport_type'
    },
    departureFrom: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'departure_from'
    },
    departureTo: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'departure_to'
    },
    departureDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'departure_date'
    },
    departureDateHour: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'departure_date_hour'
    },
    returnFrom: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'return_from'
    },
    returnTo: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'return_to'
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'return_date'
    },
    returnDateHour: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'return_date_hour'
    },
    companionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'companion_number'
    },
    fatherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'father_id'
    },
    observationAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'observation_agent'
    },
    fatherNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'father_number'
    },
    root: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'orders',
    timestamps: false,
    underscored: true,
  });

  return Order;
};

export default order;
