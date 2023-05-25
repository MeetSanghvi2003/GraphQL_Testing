import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", UserSchema);
export default User;
