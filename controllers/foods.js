// controllers/foods.js

const express = require('express');
const router = express.Router();

const Food = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await Food.findById(req.session.user._id);
        // Send all pantry items to the view via res.locals
    res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
        user: currentUser
      });
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
      }
    });

    router.get('/new', (req, res) => {
      res.render('foods/new.ejs', { user: req.session.user });
    });
  
  router.post('/', async (req, res) => {
    try {
      // Find the user by their session ID
      const currentUser = await Food.findById(req.session.user._id);
      
      currentUser.foods.push(req.body)
      // Push the new food item to the user's pantry
      user.pantry.push(req.body);
  
      // Save the user with the updated pantry
      await currentUser.save();
  
      // Redirect back to the pantry index view with a success message
      res.redirect(`/users/${currentUser._id}/foods`);;
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  router.get('/:foodsId', (req, res) => {
    res.send(`here is your request param: ${req.params.foodsId}`);
  });

  router.get('/:foodsId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await Food.findById(req.session.user._id);
      // Find the application by the applicationId supplied from req.params
      const application = currentUser.foods.id(req.params.applicationId);
      // Render the show view, passing the application data in the context object
      res.render('foods/show.ejs', {
        application: application,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/')
    }
  });

  router.get('/:foodsId/edit', async (req, res) => {
    try {
      const currentUser = await Foods.findById(req.session.user._id);
      const application = currentUser.foods.id(req.params.applicationId);
      res.render('foods/edit.ejs', {
      foods : foods,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


  router.delete('/:itemId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      
      // Use the id supplied from req.params to delete the food item
      currentUser.pantry.id(req.params.itemId).remove();
      
      // Save changes to the user
      await currentUser.save();
      
      // Redirect back to the pantry index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  

module.exports = router;
