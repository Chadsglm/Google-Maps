const express = require('express')
const mongoose = require('mongoose');
const Store = require('./api/modals/store');
require('dotenv').config()

const app = express()
const port = 3000;

//Set up default mongoose connection
const mongoDB = `mongodb+srv://Admin:${process.env.MONGO_DB_API}@cluster0.7vccj.mongodb.net/store?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("DB Connected Successfully");
});

app.use(express.json({ limit: '50mb' }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/stores', (req, res) => {
  let dbStores = req.body;
  // console.log(dbStores);
  let store = new Store({
    storeName: 'Test',
    phoneNumber: '23456789',
    location: {
      type: 'Point',
      coordinates: [34.101461, -118.326497]
    }
  })
  store.save();
  res.send('You have posted')
})

app.listen(port, () => {
  console.log(`Google Maps App listening at http://localhost:${port}`)
})