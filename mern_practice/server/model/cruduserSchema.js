const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const cruduserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  job: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
});

// cruduserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

// cruduserSchema = pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });
cruduserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const crudusers = mongoose.model("crud-users", cruduserSchema);

module.exports = crudusers;
