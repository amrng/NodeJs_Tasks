import postModel from "../../db/post.model.js";
import userModel from "../../db/user.model.js";

// 1- Add new post and check if the user exists
const addPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await userModel.findById({ _id: id });
    const { title, content, isActive } = req.body;
    console.log(userExists ? true : false);
    if (userExists) {
      let newPost = await postModel.insertMany({
        title,
        content,
        isActive,
        userId: id,
      });
      console.log(newPost);
      return res.status(201).json({ message: "Post Added", newPost });
    } else {
      return res.status(400).json({ message: "User Not Exist" });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while adding post", err });
  }
};

// 2- Delete post byPost creator
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    const postCreator = await postModel.find({ userId: user });
    if (postCreator) {
      const { _id } = req.body;
      let deleted = await postModel.findByIdAndDelete({ _id });
      if (deleted) {
        return res.status(201).json({ message: "Post Deleted", deleted });
      } else {
        return res.status(400).json({ message: "Post not exist" });
      }
    } else {
      return res.status(400).json({ message: "User not creator" });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while delete post", err });
    // return next(new Error("mo"));
  }
};

// 3- update post by his creator
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    const postCreator = await postModel.find({ userId: user });
    if (postCreator) {
      const { _id, title, content, isActive, __v } = req.body;
      let postToUpdate = await postModel.findByIdAndUpdate({ _id });
      if (postToUpdate) {
        let updateStatus = await postModel.updateOne({
          title,
          content,
          isActive,
          __v,
        });
        let update = await postModel.findById({ _id });
        return res.status(201).json({ message: "Post Updated", update });
      } else {
        return res.status(400).json({ message: "Post not exist" });
      }
    } else {
      return res.status(400).json({ message: "User not creator" });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while delete post", err });
  }
};

// 4- Get all posts
const getAllposts = async (req, res) => {
  try {
    let allPosts = await postModel.find();
    return res.status(201).json({ message: "Here are All posts", allPosts });
  } catch {
    (err) =>
      res.status(404).json({ error: "Something went wrong while search", err });
  }
};

// 5- Get All Posts with their ownerd
const getAllpostsWithOwner = async (req, res) => {
  try {
    let allPosts = await postModel.find().populate("userId");
    return res
      .status(201)
      .json({ message: "Here are All posts With owners", allPosts });
  } catch {
    (err) =>
      res.status(404).json({ error: "Something went wrong while search", err });
  }
};

// 6- Sort posts Decending by update
const sortPosts = async (req, res) => {
  try {
    // const { updatedAt } = req.body;
    let sorted = await postModel.find().sort({ createdAt: 1 });
    return res.json({ message: "Here are All Sorted posts", sorted });
  } catch {
    (err) => res.json({ error: "Something went wrong while sorting", err });
  }
};

export {
  getAllposts,
  addPost,
  deletePost,
  updatePost,
  getAllpostsWithOwner,
  sortPosts,
};
