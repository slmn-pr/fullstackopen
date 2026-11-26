const mongoose = require("mongoose");
require("dotenv/config");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length !== 1 && args.length !== 3) {
    console.error("Invalid arguments!");
    process.exit(1);
  }

  const password = args[0];

  const CONNECTION_STRING = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(password)}@${process.env.MONGODB_HOST}/phonebook?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(CONNECTION_STRING);

    // Read all contacts
    if (args.length === 1) {
      const persons = await Person.find();

      console.log("phonebook: ");
      persons.forEach((person) => console.log(person.name, person.number));
    }
    // Add contact
    else {
      const name = args[1];
      const number = args[2];

      const existPerson = await Person.findOne({ name });
      if (!existPerson) {
        const person = new Person({ name, number });
        await person.save();

        console.log(`added ${name} number ${number} to phonebook`);
      } else {
        console.error("Person already exist");
      }
    }
  } finally {
    await mongoose.connection.close();
  }
};

main();
