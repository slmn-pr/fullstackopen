const express = require("express");
const app = express();

app.use(express.json());

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
    return response.status(404).json({ error: "Person not found!" });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  let existRecord = persons.find((person) => person.id === request.params.id);

  if (!existRecord)
    return response.status(404).json({ error: "Person not found!" });

  persons = persons.filter((person) => person.id !== existRecord.id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body?.name || !request.body?.name.trim())
    return response.status(400).json({ error: "name is missing!" });
  else if (!request.body?.number)
    return response.status(400).json({ error: "number is missing!" });

  let name = request.body.name.trim();
  let number = request.body.number;

  let isExist = persons.some((person) => person.name === name);
  if (isExist)
    return response.status(409).json({ error: "Name already exist" });

  let payload = {
    id: Math.floor(Math.random() * 1_000_000).toString(),
    name,
    number,
  };

  persons.push(payload);
  response.status(201).json(payload);
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
