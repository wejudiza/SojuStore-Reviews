const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');
const port = 8008;

let server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors())

server.use('/api', router);
server.use(express.static(path.join(__dirname, '../client/dist')));

server.listen(port, ()=>console.log(`LISTENING ON PORT ${port}`));