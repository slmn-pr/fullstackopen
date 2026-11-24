const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("Hi salman 👋");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  let existRecord = persons.find((person) => person.id === request.params.id);

  if (existRecord) {
    return response.json(existRecord);
  } else {
    return response.status(404).json({ message: "Person not found!" });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  let existRecord = persons.find((person) => person.id === request.params.id);

  if (!existRecord)
    return response.status(404).json({ message: "Person not found!" });

  persons = persons.filter((person) => person.id !== existRecord.id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(`
    <div>
      <h2> Phonebook has info for ${persons.length} people  </h2>
      <p> ${new Date().toString()} </p>
    </div>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
