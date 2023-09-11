import express from "express";
const app = express();
const port = 3000;
import userRoutes from "./modules/users/users.routes.js";
import postRoutes from "./modules/posts/posts.routes.js";
import { initConnection } from "./db/connection.js";
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

initConnection();
app.listen(port, () => console.log(`Server Connected on port ${port}!`));
