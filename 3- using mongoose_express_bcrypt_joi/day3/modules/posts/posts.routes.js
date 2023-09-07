import express from "express";
const postRoutes = express.Router();
import {
  getAllposts,
  addPost,
  deletePost,
  updatePost,
  getAllpostsWithOwner,
  sortPosts,
} from "./posts.controller.js";

postRoutes.post("/addpost/:id", addPost);
postRoutes.delete("/delete/:id", deletePost);
postRoutes.patch("/update/:id", updatePost);
postRoutes.get("/allposts", getAllposts);
postRoutes.get("/allposts_withOwner", getAllpostsWithOwner);
postRoutes.get("/sorted", sortPosts);

export default postRoutes;
