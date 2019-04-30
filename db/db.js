const mongoose = require('mongoose');

//const connectionString = 'mongodb://localhost/emphasis-db';
const connectionString = 'mongodb://server-admin-user:hit-the-chili-pepper@mongodb-1897-0.cloudclusters.net:10010/emphasis-db?authSource=admin';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('mongoose connected to ', connectionString);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose disconnected to ', connectionString);
});

mongoose.connection.on('error', (error) => {
  console.log('mongoose error ', error);
});