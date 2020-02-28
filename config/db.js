const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
 try {
  await mongoose.connect(db, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
  });
  console.log('MongoDB connected');
 } catch (err) {
  console.log('MongoDB not connected');
  console.log(err.message);
  process.exit(1);
 }
};

module.exports = connectDB;
