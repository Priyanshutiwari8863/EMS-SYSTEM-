const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        // ✅ if not exist → create
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: "google_auth", // dummy
            role: "Employee",
            profilePhoto: profile.photos[0]?.value || "",
          });
        }

        // ✅ create JWT
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
