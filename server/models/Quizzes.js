// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
module.exports = (sequelize, DataTypes) => {

    const Quizzes = sequelize.define('quizzes',
      {
        name: {
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
        Quizzes.hasMany(models.cuecards, {
          onDelete: "cascade",
        });
      };
    return Quizzes
  }
  