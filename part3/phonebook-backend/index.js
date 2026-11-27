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

app.get("/api/persons/:id", async (request, response, next) => {
  let result;
  try {
    result = await Person.findById(request.params.id);
  } catch (error) {
    return next(error);
  }

  if (!result) {
    return response.status(404).json({ error: "Person not found!" });
  }

  return response.json(result);
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id);

    if (deletedPerson) {
      response.status(204).end();
    } else {
      return response.status(404).json({ error: "Person not found!" });
    }
  } catch (error) {
    return next(error);
    // return response.status(500).json({ error: "Delete person failed" });
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedPerson) {
      return response.status(404).json({ error: "Person not found!" });
    }

    return response.status(200).json(updatedPerson);
  } catch (error) {
    return next(error);
  }
});

app.post("/api/persons", async (request, response) => {
  if (!request.body?.name || !request.body?.name.trim())
    return response.status(400).json({ error: "name is missing!" });

  if (!request.body?.number)
    return response.status(400).json({ error: "number is missing!" });

  const name = request.body.name.trim();
  const number = request.body.number;

  let isExist = await Person.findOne({ name });
  if (isExist)
    return response.status(409).json({ error: "Name already exist" });

  const savedPerson = await Person.create({
    name,
    number,
  });
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

// Error handler
app.use((error, request, response, _next) => {
  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
