const passport = require('passport');
const MicrosoftStrategy = require("passport-microsoft").Strategy
const config = require("../config/config")

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user);
  })
});

passport.deserializeUser((id, done) => {
  process.nextTick(() => {
    done(null, id);
  }
)});

const microsoftStrategy = new MicrosoftStrategy({
    // Standard OAuth2 options
    clientID: config.MICROSOFT_CLIENT_ID,
    clientSecret: config.MICROSOFT_CLIENT_SECRET,
    callbackURL: `${config.BACKEND_URL}/auth/microsoft/callback`,
    scope: ['user.read'],

    // Microsoft specific options

    // [Optional] The tenant for the application. Defaults to 'common'. 
    // Used to construct the authorizationURL and tokenURL
    tenant: 'common',

    // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
    authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

    // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
    tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
);

module.exports = {
  microsoftStrategy,
}

