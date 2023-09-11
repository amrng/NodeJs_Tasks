const httpServer = require("http");
const port = 3000;

let usersPost = [
  {
    id: 1,
    userName: "Amr",
    post: "Hellooooo i,m Amr 😎",
  },
  {
    id: 2,
    userName: "Reem",
    post: "Hiiii i,m Reem 💕",
  },
  {
    id: 3,
    userName: "Alaa",
    post: "Heeey i,m Alaa 😊",
  },
  {
    id: 4,
    userName: "Ro2a",
    post: "Hola i,m Ro2a 😁",
  },
  {
    id: 5,
    userName: "Malek",
    post: "helloz i,m Malek 🥳",
  },
  {
    id: 6,
    userName: "Ahmed",
    post: "i,m Ahmed 😒",
  },
];

const server = httpServer.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    res.end("Home");
  }
  // All usersPost
  else if (req.url == "/usersPost" && req.method == "GET") {
    res.end(JSON.stringify(usersPost));
  }
  // Sors sort
  else if (req.url == "/sorted" && req.method == "GET") {
    let sorted = usersPost.sort((a, b) => {
      return b < a ? 1 : -1;
    });
    console.log(sorted);
    res.end(JSON.stringify(sorted));
  }

  // Add New User
  else if (req.url == "/adduser" && req.method == "POST") {
    req.on("data", (chunck) => {
      usersPost.push(JSON.parse(chunck));
      res.end("User Added");
    });
  }
  // Delete user
  else if (req.url == "/deleted" && req.method == "DELETE") {
    req.on("data", (chunck) => {
      let deleted = JSON.parse(chunck);
      let newUser = usersPost.filter((userID) => userID.id != deleted.id);
      usersPost = newUser;

      res.end("User deleted");
    });
  }
  // Update user
  else if (req.url == "/update" && req.method == "PATCH") {
    req.on("data", (chunck) => {
      let updated = JSON.parse(chunck);
      for (const user of usersPost) {
        if (user.id == updated.id) {
          user.post = updated.post;
          res.end("User post Updated");
        }
      }
    });
  }
  // Find user by id
  else if (req.url == "/search" && req.method == "POST") {
    req.on("data", (chunck) => {
      let foundUser = JSON.parse(chunck);
      let find = usersPost.find((id) => id.id == foundUser.id);
      usersPost = find;

      res.end("User found");
    });
  } else {
    res.end("404 Page not found");
  }
});

server.listen(port, () => {
  console.log(`Server Connected on port ${port}`);
});
