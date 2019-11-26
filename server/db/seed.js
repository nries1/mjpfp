const { db, Event } = require('./index.js');

db.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.log(`error syncing database ${error}`);
  });
