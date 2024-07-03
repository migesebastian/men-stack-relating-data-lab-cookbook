const express = require('express');
const router = express.Router();

const FOOD = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      // Find all users
      const users = await FOOD.find({});
      // Render the users index view with the list of users
      res.render('users/index.ejs', { users: users });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // Show route for displaying a specific user's profile and pantry items
router.get('/:userId', async (req, res) => {
    try {
      // Find the user by their ID
      const user = await FOOD.findById(req.params.userId);
      // Render the user's show view with the user's data
      res.render('users/show.ejs', { user: user });
    } catch (error) {
      console.log(error);
      res.redirect('/users');
    }
  });
  
  module.exports = router;