const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {Gathering} = require('./models');

router.get('/', (req, res) => {
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

router.use(bodyParser.json());

router.post('/', (req, res) => {
  // const requiredFields = ['host', 'date', 'restaurant'];
  // for (let i = 0; i < requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`;
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }
console.log(req.body);
  Gathering
    .create({
      host: req.body.host,
      date: req.body.date,
      restaurant: req.body.restaurant
    })
    .then(gatherings => res.status(201).json(gatherings.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err});
    });

});

module.exports = router;
