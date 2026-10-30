const { handleSignin } = require("./controllers/signin");
const { handleRegister } = require("./controllers/register");
const { handleProfile } = require("./controllers/profile");
const { handleImage } = require("./controllers/image");

require("dotenv").config();

const {
  hash,
  verify,
  genSalt,
  compare,
  parseOptions,
} = require("@node-rs/bcrypt");

const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    API_PORT: process.env.DB_API_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
// console.log(db.select("*").from("users").then((data) => console.log(data)));

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/*

ROUTES:
/ --> res = this is working
/signin --> POST = success/fail
/resigster --> POST = user
/profile/:id --> GET = user
/image --> PUT = usr

*/

app.get("/", (req, res) => {
  res.json("Welcome to SmartFace!");
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, verify);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, hash);
});

app.get("/profile/:id", async (req, res) => {
  handleProfile(req, res, db);
});

app.put("/image", async (req, res) => {
  handleImage(req, res, db);
});

const API_PORT = process.env.API_PORT;
app.listen(API_PORT, () => {
  console.log(`App is running on API_PORT: http://localhost:${API_PORT}`);
});

console.log("API_PORT: ", API_PORT);
