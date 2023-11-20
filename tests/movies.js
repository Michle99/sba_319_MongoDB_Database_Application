// Set env variable to test during testing
process.env.NODE_ENV = 'test';

import connectToDatabase from '../db/dbconn.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import expressApp from '../app.js';

let should = chai.should();



