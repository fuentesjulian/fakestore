import MongoDbContainer from "../contenedores/ContenedorMongoDB.js";
import * as userConfig from "../config/users.js";
import bcrypt from "bcrypt";
import * as emailer from "../services/emailer.js";

const userContainer = new MongoDbContainer(
  userConfig.userCollection,
  userConfig.userSchema
);

export const login = async (email, password, done) => {
  try {
    const user = await userContainer.getByField("email", email);
    if (user) {
      // si el user existe comparo la contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return done(null, false);
      return done(null, user);
    } else {
      // si el user no existe devuelve done(null, false)
      return done(null, false);
    }
  } catch (error) {
    // si hay error devuelve done(err)
    return done(error);
  }
};

export const signup = async (req, email, password, done) => {
  const { nombre, direccion, edad, telefono } = req.body;

  if (
    !nombre ||
    !direccion ||
    !edad ||
    !telefono ||
    !email ||
    !password ||
    !req.file
  )
    return done(null, false);
  try {
    const user = await userContainer.getByField("email", email);
    if (user) {
      // si el user existe devuelve done(null, false)
      return done(null, false);
    } else {
      // si el user no existe y pudo registrarlo done(null, user)
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        email,
        password: hashedPassword,
        nombre,
        direccion,
        edad,
        telefono,
        avatar: req.file.filename,
      };
      const newUser = await userContainer.createNew(userData);
      emailer.nuevoRegistro(userData);
      return done(null, newUser);
    }
  } catch (error) {
    // si hay error devuelve done(err)
    return done(error);
  }
};

export const getUserByEmail = async (email) => {
  const user = await userContainer.getByField("email", email);
  return user;
};

export const getUserById = async (id) => {
  const user = await userContainer.getById(id);
  return user;
};
