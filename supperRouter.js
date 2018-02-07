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

router.get('/:id', (req, res) => {
  Gathering
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
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

router.delete('/:id', (req, res) => {
  Gathering
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['host', 'date', 'restaurant'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Gathering
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

router.delete('/:id', (req, res) => {
  Gathering
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});


router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});



module.exports = router;
