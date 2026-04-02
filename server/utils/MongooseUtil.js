const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected MongoDB"))
  .catch(err => console.error(err));