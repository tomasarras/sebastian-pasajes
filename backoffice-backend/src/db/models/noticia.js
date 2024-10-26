import { DataTypes } from 'sequelize';

const noticia = (sequelize) => {
  const Noticia = sequelize.define('Noticia', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Titulo: {
      type: DataTypes.CHAR(40),
      allowNull: false
    },
    Subtitulo: {
      type: DataTypes.CHAR(40),
      allowNull: false
    },
    Texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Urgente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      get() {
        const value = this.getDataValue('Urgente');
        return value === 1
      }
    }
  }, {
    tableName: 'noticias',
    timestamps: false
  });

  return Noticia;
};

export default noticia;
