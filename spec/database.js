// Library dependencies
const mongoose = require('mongoose');
// File dependencies
const db = require('../database/index.js');

/* ----------------
Database Unit Tests
---------------- */
describe('Mongo Database', () => {
  it(`Sucessfully connects to MongoDBS ${db.dbName}`, done => {
    mongoose.connect(`mongodb://localhost/${db.dbName}`, done);
  });
});

// describe('Mongo Database', function() {
//   before(function (done) {
//     mongoose.connect('mongodb://localhost/FEC', done);
//   });
//   // write test here
//   it('do we really need this')
// })