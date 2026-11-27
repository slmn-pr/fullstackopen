const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,
    minLength: 8,
    required: true,

    validate: {
      validator: (value) => {
        const regex = /^\d{2,3}-\d+$/;

        return regex.test(value);
      },
      message: "Phone number is invalid",
    },
  },
});

module.exports = mongoose.model("Person", personSchema);
