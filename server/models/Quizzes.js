// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
module.exports = (sequelize, DataTypes) => {

    const Quizzes = sequelize.define('Quizzes',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
      , {
        // Other model options go here
      });
      Quizzes.associate = (models) => {
        Quizzes.hasMany(models.Cuecards, {
          onDelete: "cascade",
        });
      };
    return Quizzes
  }
  