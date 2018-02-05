'use strict';

const mongoose = require('mongoose');

const gatheringSchema = mongoose.Schema({
	host: {type: String, required: true},
	numberAttending: {type: Number, required: true},
	date: {type: Date, required: true},
	restaurant: {
		name: String,
		address: String,
		cuisine: String
	}
});

gatheringSchema.methods.serialize = function() {

	return {
		id: this._id,
		host: this.host,
		numberAttending: this.numberAttending,
		date: this.date,
		restaurantName: this.restaurant.name,
		restaurantAddress: this.restaurant.address
	};
}

const Gathering = mongoose.model('Gathering', gatheringSchema);

module.exports = {Gathering};