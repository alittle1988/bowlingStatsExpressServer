const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(cors());
const users = [
  {
    id: 1,
    userName: "alittle1988",
    firstName: "Andrew",
    lastName: "Little",
    gamesPlayed: 0,
    games: [],
    password: "password",
  },
  {
    id: 2,
    userName: "mKahn1981",
    firstName: "Melissa",
    lastName: "Kahn",
    gamesPlayed: 0,
    games: [],
    password: "password1",
  },
];

function getIndexById(id) {
  const num = (element) => element.id === id;
  return users.findIndex(num);
}

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:userName", (req, res, next) => {
  let notFound = true;

  users.forEach((user) => {
    if (req.params.userName === user.userName) {
      if (req.query.password === user.password) {
        notFound = false;
        res.status(200).send(user);
      } else {
        notFound = false;
        res.status(401).send({ error: "Password Incorrect!" });
      }
    }
  });

  if (notFound === true) {
   
    res.status(404).send({ error: "User does not exist" });
  }
});

app.post("/users", (req, res) => {
  let newuser = {...req.body, id:users.length + 1};
  let alreadyExists = false;
  users.forEach((user) => {
    if (user.userName === newuser.userName) {
      alreadyExists = true;
      res.status(422).send({ error: "User already exists" });
    }
  });
  if (!alreadyExists) {
    
    users.push(newuser);
    console.log(users);
    res.status(201).send(newuser);
  } else {
    
  }
});

app.put("/users/:id", (req, res) => {
  let updatedUser = req.body;
  let index = getIndexById(req.body.id);
  console.log(index);
  if (index !== -1) {
    users.splice(index, 1, updatedUser);
    res.status(201).send(users[index]);
  } else {
    res.status(401).send({ error: "Request was Unsuccessfull" });
  }
});

app.delete("/users/:id", (req, res) => {
  let index = getIndexById(req.body.id);
  if (index !== -1) {
    users.splice(index, 1);

    res.status(204).send();
  } else {
    res.status(404).send({ error: "Request Unsucessfull" });
  }
});

console.log(users);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
