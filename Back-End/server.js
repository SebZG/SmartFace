const express = require("express");

const app = express();

/*

ROUTES:
/ --> res = this is working
/signin --> POST = success/fail
/resigster --> POST = user
/profile/:id --> GET = user
/image --> PUT = usr

*/

app.get("/", (req, res) => {
  res.send("This is working");
});



app.listen(3000, () => {
  console.log("App is running on port: 3000");
});
