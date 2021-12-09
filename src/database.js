const mongoose = require('mongoose');

const { HOST_MONGO, DATABASE_USERS} = process.env;
const MONGODB_URI = `mongodb://${HOST_MONGO}/${DATABASE_USERS}`;

mongoose.connect(MONGODB_URI).then(db => console.log('database conected')).catch(err => console.error(err))