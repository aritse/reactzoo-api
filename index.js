const express = require("express");
const cors = require("cors");

const app = express();
// app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(cors({ origin: ["https://zoo-react-ari.herokuapp.com"] }));

const db = require("./models");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/animals", (req, res) => {
  db.Animal.findAll().then(animals => res.json(animals));
});

app.get("/api/animals/class/:className", (req, res) => {
  db.Animal.findAll({
    where: {
      class: req.params.className
    }
  }).then(mammals => res.json(mammals));
});

app.get("/seed", (req, res) => {
  const animals = [
    {
      species: "zebra",
      class: "mammal",
      eatsMeat: false,
      weight: 200
    },
    {
      species: "lion",
      class: "mammal",
      eatsMeat: true,
      weight: 150
    },
    {
      species: "whale shark",
      class: "fish",
      eatsMeat: false,
      weight: 5000
    },
    {
      species: "penguin",
      class: "bird",
      eatsMeat: true,
      weight: 5
    },
    {
      species: "bald eagle",
      class: "bird",
      eatsMeat: true,
      weight: 10
    },
    {
      species: "banana slug",
      class: "insect",
      eatsMeat: false,
      weight: 1
    },
    {
      species: "manatee",
      class: "mammal",
      eatsMeat: false,
      weight: 75
    },
    {
      species: "gorilla",
      class: "mammal",
      eatsMeat: false,
      weight: 100
    },
    {
      species: "cat",
      class: "mammal",
      eatsMeat: true,
      weight: 4
    },
    {
      species: "frog",
      class: "amphibian",
      eatsMeat: false,
      weight: 2
    }
  ];

  db.Animal.bulkCreate(animals).then(animals => console.log("data seeded"));
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, console.log("express app listening on", PORT));
});
