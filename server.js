const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      password: "cookies",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      password: "bananas",
      email: "sally@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
};

// Root route
app.get("/", (req, res) => {
  res.send(database.users);
});

// signin route

app.post("/signIn", (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare(
  //   "apples",
  //   "$2a$10$wVHJKxUf.zAQ6hBCtbz5cuh0IMlUxxsRi9wnkoRwApRzRUHEdWTJK",
  //   function (err, res) {
  //     // res == true
  //     console.log("first guess", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$wVHJKxUf.zAQ6hBCtbz5cuh0IMlUxxsRi9wnkoRwApRzRUHEdWTJK",
  //   function (err, res) {
  //     // res = false
  //     console.log("second guess", res);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.json("Error logging in");
  }
});

// Register route
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

// Profile route
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
    res.status(404).json("No such user found");
  }
});

// Image route

app.put("/image", (req, res) => {
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
    res.status(404).json("No such user found");
  }
});

// bcrypt.hash("bacon", null, null, function (err, hash) {
//   // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//   // res = false
// });

app.listen(3000, () => {
  console.log("App is running on PORT 3000");
});
