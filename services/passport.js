const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },

    async (accessToken, refreToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      console.log('I am checking users');
      if (existingUser) {
        // already have a user with that id
        return done(null, existingUser);
      }
      // we need to create a new user

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
