const mongoose = require("mongoose");
const app = require("./app");

const { PORT, MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI, { family: 4 });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
