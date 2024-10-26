import { DataTypes } from 'sequelize';

const cursoTemas = (sequelize) => {
    const CursoTemas = sequelize.define('CursoTemas', {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Nombre: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'cursostemas',
      timestamps: false,
      charset: 'utf8'
    });
  
    return CursoTemas;
};

export default cursoTemas