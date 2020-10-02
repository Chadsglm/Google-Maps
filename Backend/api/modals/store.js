const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  storeName: String,
  phoneNumber: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {},
  openStatustext: String,
  addressLines: Array
});

module.exports = mongoose.model('Store', storeSchema);