const mongoose = require("mongoose");

const notiSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: { type: String, require: true },
});

const Noti = mongoose.model("noti", notiSchema);
module.exports = Noti;
