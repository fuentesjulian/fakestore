import mongoose from "mongoose";

export const userCollection = "user";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },

  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String,
});
