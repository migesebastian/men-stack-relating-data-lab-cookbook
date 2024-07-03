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
  
  module.exports = router;