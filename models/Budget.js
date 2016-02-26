var mongoose = require("mongoose");

var BudgetSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    endDate: {type: Date, required: true},
    //indices = 0 : food, 1 : travel, 2 : clothes, 3 : utilities, 4 : electronics, 5 : miscellaneous
    planData: {type: [Number], required: true},
    usedData: {type: [Number], required: true}
});

BudgetSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Budget", BudgetSchema);
