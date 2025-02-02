const express = require('express');
const passport = require('passport'); // Correctly imported passport
const router = express.Router();

// @desc Authenticate with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // Added 'email' scope to retrieve user's email

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirects to the dashboard upon successful login
  }
);

// @desc Logout user
// @route GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => { // Updated for Passport 0.6.0+ (logout now requires a callback)
    if (err) {
      return next(err);
    }
    res.redirect('/'); // Redirects to the homepage after logout
  });
});

module.exports = router;
