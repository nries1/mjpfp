const express = require('express');
const path = require('path');
const { db, Event } = require('./db/index.js');
//const formidable = require('formidable');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));
const PORT = 3000;

app.get('/', (req, res, next) => {
  console.log('received get request');
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), err => {
    err
      ? console.log(`error serving index.html ${err}`)
      : console.log(`Served index.html`);
  });
});

app.get('/events', (req, res, next) => {
  Event.findAll()
    .then(events => {
      res.status(200).send(events);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
});

app.post('/create-event', (req, res, next) => {
  const eventData = req.body;
  Event.create({
    ...eventData
  })
    .then(result => {
      res.status(200).send({ result });
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

app.delete('/:id?', (req, res, next) => {
  const eventId = req.params.id;
  Event.destroy({
    where: {
      id: eventId
    }
  })
    .then(result => {
      res.status(200).send({ message: result.data });
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

db.sync()
  .then(() => {
    console.log('synced database');
    app.listen(PORT, () => {
      console.log(`App is listening at ${3000}`);
    });
  })
  .catch(error => {
    console.log(`Failed to sync db because ${error}`);
  });
