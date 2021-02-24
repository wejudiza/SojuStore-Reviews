// Library dependencies
const chai = require('chai');
const expect = chai.expect;
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