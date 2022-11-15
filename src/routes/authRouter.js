// Middlewares de auth
import { isLoggedIn, isLoggedOut } from "../middlewares/authentication.js";
import { signup } from "../services/userService.js";

export const configAuthRouter = (authRouter, passport) => {
  authRouter
    .get("/login", isLoggedOut, (req, res) => {
      const loginError = "error" in req.query;
      let msg;
      if (loginError) {
        msg = "Credenciales incorrectas";
      } else {
        msg = false;
      }

      res.render("login", { msg });
    })
    .post(
      "/login",
      isLoggedOut,
      passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/login?error",
      })
    )
    .get("/signup", isLoggedOut, (req, res) => {
      res.render("signup");
    })
    .post("/signup", isLoggedOut, signup)
    .get("/logout", isLoggedIn, (req, res) => {
      // cargo temporalmente el nombre de la sesion
      const nombre = req.user.nombre;
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.render("logout", { nombre: nombre });
      });
    })
    .get("/login-error", isLoggedOut, (req, res) => {
      res.render("error", {
        error: "User error login",
        redirect: "login",
      });
    })
    .get("/signup-error", isLoggedOut, (req, res) => {
      res.render("error", {
        error: "User error signup",
        redirect: "signup",
      });
    });
};
