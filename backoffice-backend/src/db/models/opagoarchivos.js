import { DataTypes } from 'sequelize';

const opagoArchivos = (sequelize) => {
    const OpagoArchivos = sequelize.define('OpagoArchivos', {
      Id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      IdEntidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "IdEntidad",
      },
      Descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Ruta: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      tableName: 'opagoarchivos',
      timestamps: false
    });

    return OpagoArchivos;
};

export default opagoArchivos; 