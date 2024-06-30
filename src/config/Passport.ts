import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/users.js";

const initializePassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await User.findOne({ username });

      try {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Password is incorrect" });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  // Configure Passport to serialize and deserialize user instances to and from the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;