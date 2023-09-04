const express = require("express");
const app = express();
const port = 4000;

let users = [
  {
    id: 1,
    userName: "Amr",
    age: 27,
    email: "amr@gmail.com",
  },
  {
    id: 2,
    userName: "Reem",
    age: 25,
    email: "reem@gmail.com",
  },
  {
    id: 3,
    userName: "Alaa",
    age: 48,
    email: "alaa@gmail.com",
  },
  {
    id: 4,
    userName: "Ro2a",
    age: 21,
    email: "ro2a@gmail.com",
  },
  {
    id: 5,
    userName: "Malek",
    age: 5,
    email: "malek@gmail.com",
  },
  {
    id: 6,
    userName: "Ahmed",
    age: 48,
    email: "ahmed@gmail.com",
  },
];

app.use(express.json());

app.get("/", (req, res) => res.send(`<h1>Hello From EXPRESS</h1>`));

//Show all users
app.get("/users", (req, res) => {
  return res.json({ users });
});

//Add new user
app.post("/users/adduser", (req, res) => {
  const { id, userName, age, email } = req.body;
  users.push({ id, userName, age, email });
  return res.json({ message: "User Added", users });
});

//Sort users
app.get("/users/sort", (req, res) => {
  let sorted = users.sort((a, b) => (a.userName > b.userName ? 1 : -1));
  return res.json({ sorted });
});

//Delete User by his Email
app.delete("/users/delete", (req, res) => {
  const { email } = req.body;
  let found = false;
  users = users.filter((user) => {
    if (user.email != email) {
      return users;
    } else {
      found = true;
    }
  });
  return found && users.length > 0
    ? res.json({ message: "User Deleted", users })
    : res.json({ message: "User Not Exist" });
});

//Update user by his ID
app.patch("/users/update", (req, res) => {
  const { id, userName, age, email } = req.body;
  for (let user of users) {
    if (user.id == id) {
      user.userName = userName;
      user.age = age;
      user.email = email;
    } else {
      return res.json({ error: "User Not exist" });
    }
    return res.json({ message: `The user ${userName} is updated`, users });
  }
});

// Search for user by his ID
app.post("/users/search", (req, res) => {
  const { userName } = req.body;

  let search = users.find((user) => user.userName == userName);
  return search
    ? res.json({ message: "Here we go", search })
    : res.json({ error: "User not found" });
});

app.listen(port, () => console.log(`Server connected Port ${port}`));
