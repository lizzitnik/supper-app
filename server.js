'use strict';

const bodyParser = require('body-parser');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/supper-app';
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const supperRouter = require('./supperRouter')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/gatherings', supperRouter);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

const port = process.env.PORT || 8080;

module.exports = {app, runServer, closeServer};
