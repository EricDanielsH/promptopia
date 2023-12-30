import { Schema, model, models } from "mongoose";
// "models" stores all registered models

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"], // [] only runs if fails
    required: [true, "Email is required!"], // [] only runs if fails
  },
  username: {
    type: String,
    unique: [true, "Username already exists!"], // [] only runs if fails
    required: [true, "Username is required!"], // [] only runs if fails
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
