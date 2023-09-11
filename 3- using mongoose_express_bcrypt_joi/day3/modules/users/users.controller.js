import userModel from "../../db/user.model.js";
import postModel from "../../db/post.model.js";
import bcrypt from "bcrypt";

// 1- SignUp
const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    let founded = await userModel.findOne({ email: email });
    if (!founded) {
      let hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let addUser = await userModel.create({
        ...req.body,
        password: hashedPassword,
      });
      return res.status(201).json({ message: "Successfully SignUp", addUser });
    } else {
      return res.status(400).json({ message: "Already Register" });
    }
  } catch {
    (err) =>
      res.status(400).json({ error: "Something went wrong while signup", err });
  }
};

// 2- SignIn
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await userModel.findOne({ email: email });
    console.log(foundedUser);
    if (foundedUser) {
      let matched = bcrypt.compareSync(password, foundedUser.password);
      console.log(matched);
      if (matched) {
        return res
          .status(202)
          .json({ message: "------- WELCOME -------", foundedUser });
      } else {
        return res.status(404).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(404).json({ message: "User not found please signUp" });
    }
  } catch {
    (err) =>
      res.status(400).json({ error: "Something went wrong while signin", err });
  }
};

//3- Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await userModel.findByIdAndUpdate(
      id,
      {
        userName: req.body.userName,
        age: req.body.age,
        phone: req.body.phone,
      },
      { new: true }
    );
    console.log(update);
    return res.json({ message: `user ${email} data updated`, update });
  } catch {
    (err) => res.json({ error: "Something went wrong while updating", err });
  }
};

//4- Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userModel.findByIdAndDelete(id);
    console.log(deleted);
    return res.json({ message: `user deleted`, deleted });
  } catch {
    (err) => res.json({ error: "Something went wrong while deleting", err });
  }
};

//5- Find user by first letter and special age
const find_nameStart_ageLess = async (req, res) => {
  try {
    const { x, y } = req.params;
    const search = await userModel.find({
      $and: [
        { userName: { $regex: new RegExp("^" + x, "i") } },
        { age: { $lt: y } },
      ],
    });
    console.log(search);
    if (search) {
      return res.json({ message: `Found`, search });
    } else {
      return res.json({ message: `NOT Found` });
    }
  } catch {
    (err) => res.json({ error: "Something went wrong while search", err });
  }
};

//6- Find User by age between x , y params
const ageBetweens = async (req, res) => {
  try {
    const { x, y } = req.params;
    const ageBtw = await userModel.find({
      $nor: [{ age: { $gt: x } }, { age: { $lt: y } }],
    });
    console.log(ageBtw);
    if (ageBtw) {
      return res.json({ message: `Found`, ageBtw });
    } else {
      return res.json({ message: `NOT Found` });
    }
  } catch {
    (err) => res.json({ error: "Something went wrong while search", err });
  }
};

// 7- Get all users
const getAllusers = async (req, res) => {
  try {
    let allData = await userModel.find();
    return res.json({ message: "Here are All Users", allData });
  } catch {
    (err) => res.json({ error: "Something went wrong while search", err });
  }
};

// 8- Get user profile with his posts
const userProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let user = await userModel.findById({ _id: id });
    console.log(user);
    if (user) {
      const posts = await postModel.find({ userId: user._id });
      return res.json({
        message: "Here are All Users",
        user,
        posts,
      });
    } else {
      return res.json({
        message: "User not exist",
      });
    }
  } catch {
    (err) => res.json({ error: "Something went wrong while search", err });
  }
};

export {
  getAllusers,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  find_nameStart_ageLess,
  ageBetweens,
  userProfile,
};
