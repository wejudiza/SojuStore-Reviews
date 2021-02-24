const mongoose = require('mongoose');
const dbName = 'FEC'
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true} ).then(() => { console.log(`Connected to database ${dbName}`) });
// const db = mongoose.connection
// db.on(('err') => {'error'})

let products = new mongoose.Schema({
  id: Number,
  name: String
});

let Product = mongoose.model('Product', products);
// create mongoose table..

// Product.create({
//   id: 1,
//   name: 'Sophia'
// });
