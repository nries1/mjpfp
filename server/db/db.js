const Sequelize = require('sequelize');
const db = new Sequelize(`postgres://localhost:5432/acme-calendar`, {
  logging: false
});

module.exports = { db };
