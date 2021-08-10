// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
module.exports = (sequelize, DataTypes) => {

    const Cuecards = sequelize.define('Cuecards',
      {
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        answer: {
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
      
    return Cuecards
  }
  