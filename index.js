const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
// app.use(cors({ origin: ["https://zoo-react-ari.herokuapp.com"] })); // enable for production
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

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

app.post("/api/animals", (req, res) => {
  db.Animal.create(req.body).then(animal => res.json(animal));
});

app.delete("/api/animals/delete/:id", (req, res) => {
  db.Animal.destroy({
    where: {
      id: req.params.id
    }
  }).then(animal => res.json(animal));
});

app.post("/api/auth/signup", (req, res) => {
  db.User.create(req.body).then(user => res.json(user));
});

app.post("/api/auth/login", (req, res) => {
  db.User.findOne({
    where: { name: req.body.name }
  }).then(dbUser => {
    if (dbUser) {
      if (bcrypt.compareSync(req.body.password, dbUser.password)) res.json("logged in");
      else res.status(401).json("incorrect password");
    } else {
      res.status(401).json("name not found");
    }
  });
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, console.log("express app listening on", PORT));
});
