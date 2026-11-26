const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");
require("dotenv/config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("payloadData", (request) => {
  return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :payloadData"));

// TODO: Make it await until connection result
mongoose.connect(process.env.MONGODB_URI);

app.get("/api/persons", async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

app.get("/api/persons/:id", async (request, response) => {
  let existRecord = await Person.findById(request.params.id);

  if (!existRecord) {
    return response.status(404).json({ error: "Person not found!" });
  }

  return response.json(existRecord);
});

app.delete("/api/persons/:id", async (request, response) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id);

    if (deletedPerson) {
      response.status(204).end();
    } else {
      return response.status(404).json({ error: "Person not found!" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Delete person failed" });
  }
});

app.post("/api/persons", async (request, response) => {
  if (!request.body?.name || !request.body?.name.trim())
    return response.status(400).json({ error: "name is missing!" });
  else if (!request.body?.number)
    return response.status(400).json({ error: "number is missing!" });

  let name = request.body.name.trim();
  let number = request.body.number;

  let isExist = await Person.findOne({ name });
  if (isExist)
    return response.status(409).json({ error: "Name already exist" });

  let payload = {
    name,
    number,
  };

  const savedPerson = await Person.create(payload);
  response.status(201).json(savedPerson);
});

app.get("/info", async (request, response) => {
  const personsCount = await Person.countDocuments({});

  response.send(`
    <div>
      <h2> Phonebook has info for ${personsCount} people  </h2>
      <p> ${new Date().toString()} </p>
    </div>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
