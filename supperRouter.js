const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Gathering} = require('./models');

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
