const mongoose = require("mongoose");

const formsManagerSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activeForm: {
      type: Object,
    },
    forms: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forms_Manager", formsManagerSchema);
