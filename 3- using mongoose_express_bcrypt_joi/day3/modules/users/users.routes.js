import express from "express";
const userRoutes = express.Router();
import {
  getAllusers,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  find_nameStart_ageLess,
  ageBetweens,
  userProfile,
} from "./users.controller.js";
import validation from "../../middleware/validation.js";
import { signUpValidationSchema, signInSchema } from "./user.validation.js";

userRoutes.post("/signup", validation(signUpValidationSchema), signUp);
userRoutes.post("/signin", validation(signInSchema), signIn);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.post("/:x/:y", find_nameStart_ageLess);
userRoutes.post("/:x/:y", ageBetweens);
userRoutes.get("/:id", userProfile);

userRoutes.get("/allusers", getAllusers);

export default userRoutes;
