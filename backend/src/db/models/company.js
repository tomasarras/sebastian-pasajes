import { DataTypes } from 'sequelize';

const company = (sequelize) => {
  const Company = sequelize.define('Company', {
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
    cuit: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    emailNotification: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: 'email_notification'
    },
    emailFrom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'email_from'
    }
  }, {
    tableName: 'company',
    timestamps: false,
    underscored: true,
  });

  return Company;
};

export default company;
