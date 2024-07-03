const express = require('express');
const router = express.Router();

const FOOD = require('../models/user.js');

// Index route for displaying the user's pantry
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await FOOD.findById(req.session.user._id);
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

// New route for rendering the form to add a new food item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { user: req.session.user });
});

// Create route for adding new food items to the pantry
router.post('/', async (req, res) => {
  try {
    // Find the user by their session ID
    const currentUser = await FOOD.findById(req.session.user._id);
    
    // Ensure the pantry array is initialized
    if (!currentUser.pantry) {
      currentUser.pantry = [];
    }

    // Push req.body (the new form data object) to the pantry array of the current user
    currentUser.pantry.push(req.body);
    
    // Save changes to the user
    await currentUser.save();
    
    // Redirect back to the pantry index view with a success message
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show route for displaying a specific food item
router.get('/:itemId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await FOOD.findById(req.session.user._id);
    // Find the food item by the itemId supplied from req.params
    const foodItem = currentUser.pantry.id(req.params.itemId);
    // Render the show view, passing the food item data in the context object
    res.render('foods/show.ejs', {
      foodItem: foodItem,
      user: currentUser
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// Edit route for rendering the form to edit a specific food item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await FOOD.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', {
      foodItem: foodItem,
      user: currentUser
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update route for updating a specific food item
router.put('/:itemId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await FOOD.findById(req.session.user._id);
    
    // Find the food item by the itemId supplied from req.params
    const foodItem = currentUser.pantry.id(req.params.itemId);
    
    // Use the .set() method to update the food item with the new data from req.body
    foodItem.set(req.body);
    
    // Save changes to the user
    await currentUser.save();
    
    // Redirect back to the pantry index view with a success message
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// Delete route for removing a food item from the pantry
router.delete('/:itemId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await FOOD.findById(req.session.user._id);
    
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
