const mongoose = require('mongoose');
const dbName = 'FEC'

const connectDB = function() {

  // Connect to user specified DB
  mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true} )
    .then(() => console.log(`Connected to database ${dbName}`))
    .catch(err => console.log(`Error when connecting to database ${dbName}. Error: ${err}`))

  // Schema for Product instances in Products collections
  let productSchema = new mongoose.Schema({
    id: Number,
    name: String
  });

  // Add schema to db + temporarily intialize with dummy entry
  let Product = mongoose.model('Product', productSchema);

  Product.create({
    id: 1,
    name: 'Sophia'
  });

}();

// Export dbName & connectDB
module.exports = {
  dbName,
  connectDB
};