// const mongoose = require('mongoose');


// function connectToDb() {
//     mongoose.connect(process.env.MONGO_URI
//     ).then(() => {
//             console.log('Connected to DB');
//         }).catch(err => console.log(err));
// }
// console.log("ENV:", process.env.MONGO_URI);



// module.exports = connectToDb;

const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    console.log("ENV:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

  } catch (error) {
    console.log("DB connection error:", error);
  }
};

module.exports = connectToDb;