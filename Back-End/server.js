const express = require("express");
const {
  hash,
  hashSync,
  verify,
  verifySync,
  genSalt,
  compare,
  parseOptions,
} = require("@node-rs/bcrypt");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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

app.post("/signin", async (req, res) => {
  const storedPassword = "$2b$12$nMAljzHCiWCA2jjmucttD.ZuVarRB9wX4jazFEzKlc9KLTe50FWFC"
  console.log(await verify(req.body.password, storedPassword));
  
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("email + password combination does not match");
  }
  
  // res.send("signin in");
  // res.json("signin in");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const storedHash = await hash(password, { cost: 12 });
  console.log(storedHash);
  // await verify(password, storedHash);

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
