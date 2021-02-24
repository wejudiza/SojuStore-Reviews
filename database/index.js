const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true, useUnifiedTopology: true} ).then(() => { console.log('hi') });
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
