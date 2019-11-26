const Sequelize = require('sequelize');
const { db } = require('./../db.js');

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = { Event };
