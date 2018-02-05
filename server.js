const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Gathering} = require('./models');

app.use(express.static('public'));
app.use('/gatherings', supperRouter);
app.use(bodyParser.json());

app.get('/gatherings', (req, res) => {
	Gathering
		.find()
		.limit(10)
		.then(gatherings => {
			res.json({
				gatherings: gatherings.map(
					(gathering) => gathering.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});








let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
  	mongoose.connect(databaseUrl, {useMongoClient: true}, err) => {
  		if (err) {
  			return reject(err);
  		}
  	}
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);

    }).on('error', err => {
    	mongoose.disconnect();
      reject(err)
    });
  });
}

function closeServer() {
	return mongoose.disconnect()
	.then(() => {
		return new Promise((resolve, reject) => {
	    console.log('Closing server');
	    server.close(err => {
	      if (err) {
	        reject(err);
	        return;
	      }
	      resolve();
	    });
	  });
	});	 
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
