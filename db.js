require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds159204.mlab.com:59204/mysexyblog`,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

module.exports = mongoose;
