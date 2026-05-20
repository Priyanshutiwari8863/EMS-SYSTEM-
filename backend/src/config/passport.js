const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // ✅ Production callback URL (hardcoded for reliability)
      callbackURL:
        "https://ems-backend-27ez.onrender.com/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if user already exists
        let user = await User.findOne({ email });

        // Create user if not found
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: "google_auth_dummy_password",
            role: "Employee",
            profilePhoto: profile.photos?.[0]?.value || "",
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        // Send user and token to callback route
        return done(null, { user, token });
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;