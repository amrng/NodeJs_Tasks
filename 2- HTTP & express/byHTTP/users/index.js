const httpServer = require("http");
const port = 5000;

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
    email: "agmed@gmail.com",
  },
];

const server = httpServer.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    res.end("Home");
  }
  // All users
  else if (req.url == "/users" && req.method == "GET") {
    res.end(JSON.stringify(users));
  }
  // Sors sort
  else if (req.url == "/sorted" && req.method == "GET") {
    let sorted = users.sort((a, b) => {
      return b.userName < a.userName ? 1 : -1;
    });
    console.log(sorted);
    res.end(JSON.stringify(sorted));
  }

  // Add New User
  else if (req.url == "/adduser" && req.method == "POST") {
    req.on("data", (chunck) => {
      users.push(JSON.parse(chunck));
      res.end("User Added");
    });
  }
  // Delete user
  else if (req.url == "/deleted" && req.method == "DELETE") {
    req.on("data", (chunck) => {
      let deleted = JSON.parse(chunck);
      let newUser = users.filter(
        (userEmail) => userEmail.email != deleted.email
      );
      users = newUser;

      res.end("User deleted");
    });
  }
  // Update user
  else if (req.url == "/update" && req.method == "PATCH") {
    req.on("data", (chunck) => {
      let updated = JSON.parse(chunck);
      for (const user of users) {
        if (user.email == updated.email) {
          user.age = updated.age;
          res.end("User age Updated");
        }
      }
    });
  }
  // Find user by id
  else if (req.url == "/search" && req.method == "POST") {
    req.on("data", (chunck) => {
      let foundUser = JSON.parse(chunck);
      let find = users.find((id) => id.id == foundUser.id);
      users = find;

      res.end("User found");
    });
  }
  // If wrong url
  else {
    res.end("404 Page not found");
  }
});

server.listen(port, () => {
  console.log(`Server Connected on port ${port}`);
});
