import mongoose from "mongoose";

export const initConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/ITI_day3")
    .then(console.log("DB connected"))
    .catch((error) => console.log(error));
};
