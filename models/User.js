var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    passHash: { type: String, required: true}
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.passHash;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
