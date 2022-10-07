const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '310313503916-1eeg42lnd5m9ni6rqll91kje0maidhdv.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
    //db queries here to check user in datatbase
    // console.log('profile :: ', profile)
    console.log('accessToken :: ', accessToken)
    console.log('refreshToken :: ', refreshToken)
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    // console.log('serialize  :: ',user )
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    // console.log('deserialize  :: ', user)
  done(null, user);
});