const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: "001",
      name: "Seb",
      email: "seb@gmail.com",
      password: "123123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "002",
      name: "Juan",
      email: "juan@gmail.com",
      password: "123123",
      entries: 0,
      joined: new Date(),
    },
  ],
};

/*

ROUTES:
/ --> res = this is working
/signin --> POST = success/fail
/resigster --> POST = user
/profile/:id --> GET = user
/image --> PUT = usr

*/

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("Error...");
  }
  // res.send("signin in");
  // res.json("signin in");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  database.users.push({
    id: "003",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json("Success");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(400).json("Not found");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json("Not found");
  }
});

app.listen(3000, () => {
  console.log(`App is running on port: http://localhost:${3000}`);
});
