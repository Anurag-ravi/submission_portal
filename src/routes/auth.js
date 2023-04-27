const express = require('express');
const passport = require('passport');
const router = express.Router();
const { debug } = require('../utilities/logging');
const config = require('../config/config');
const User = require('../models/user');
const user_token = require('../utilities/usertoken');

router.get('/microsoft',
  passport.authenticate('microsoft', {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
    prompt: 'select_account',
  })
);

router.get('/microsoft/callback', 
  passport.authenticate('microsoft', { failureRedirect: '/auth/microsoft' }),
  async (req,res) => {
    
    const email = req.user.emails[0].value;
  
    const user = await User.findOne({email});

    if(!user) {
      const new_user = new User({
          email: email,
          name: req.user.displayName,
          roll: req.user.name.familyName,
      })
      await new_user.save();
      //generate token
      const token = user_token.generateToken(new_user);
      debug(`Generated token: ${token}`);
      res.redirect(`${config.FRONTEND_URL}/?token=${token}`);
    }
    else {
      //generate token
      const token = user_token.generateToken(user);
      debug(`Generated token: ${token}`);
      res.redirect(`${config.FRONTEND_URL}/callback/?token=${token}`);
    }
  }
);

module.exports = router;