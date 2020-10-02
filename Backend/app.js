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
  const stores = req.body;
  let dbStores = [];

  for (const store of stores) {
    dbStores.push({
      storeName: store.name,
      phoneNumber: store.phoneNumber,
      address: store.address,
      openStatusText: store.openStatusText,
      addressLines: store.addressLines,
      location: {
        type: 'Point',
        coordinates: [
          store.coordinates.longitude,
          store.coordinates.latitude
        ]
      }
    })
  }

  Store.create(dbStores, (err, stores) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(stores);
    }
  })

  // console.log(dbStores);
  // res.send('You have posted')
})

app.delete('/api/stores', (req, res) => {
  Store.deleteMany({}, (err) => {
    if (err) throw err;
    res.status(200).send(err)
    console.log("Deleted All Store");
  })
})

app.listen(port, () => {
  console.log(`Google Maps App listening at http://localhost:${port}`)
})