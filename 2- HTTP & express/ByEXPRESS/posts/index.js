const express = require("express");
const app = express();
const port = 4000;

let posts = [
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

app.use(express.json());

app.get("/", (req, res) => res.send(`<h1>Hello From EXPRESS</h1>`));

//Show all posts
app.get("/posts", (req, res) => {
  return res.json({ posts });
});

//Add new User, Post
app.post("/posts/adduser", (req, res) => {
  const { id, userName, post } = req.body;
  posts.push({ id, userName, post });
  return res.json({ message: "User Post Added", posts });
});

//Sort posts
app.get("/posts/sort", (req, res) => {
  let sorted = posts.sort((a, b) => (a.id < b.id ? 1 : -1));
  return res.json({ sorted });
});

//Delete post by his ID
app.delete("/posts/delete", (req, res) => {
  const { id } = req.body;
  let found = false;
  posts = posts.filter((user) => {
    if (user.id != id) {
      return posts;
    } else {
      found = true;
    }
  });
  return found && posts.length > 0
    ? res.json({ message: "Post Deleted", posts })
    : res.json({ message: "Post Not Exist" });
});

//Update post by his ID
app.patch("/posts/update", (req, res) => {
  const { id, userName, post } = req.body;
  for (let po of posts) {
    if (po.id == id) {
      po.userName = userName;
      po.post = post;
    } else {
      return res.json({ error: "User Not exist" });
    }
    return res.json({ message: `The post of ${userName} is updated`, posts });
  }
});

// Search for posr by his ID
app.post("/posts/search", (req, res) => {
  const { id } = req.body;

  let search = posts.find((post) => post.id == id);
  return search
    ? res.json({ message: "Here we go", search })
    : res.json({ error: "User not found" });
});

app.listen(port, () => console.log(`Server connected Port ${port}`));
