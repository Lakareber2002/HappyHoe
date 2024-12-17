const express = require("express");
const router = express.Router();
const passport = require("passport");
const Register = require("../models/register");

// GET route for the registration form
router.get("/addUser", (req, res) => {
  res.render("register", { title: "Register" });
});

// POST route for registration
router.post("/addUser", async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await Register.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("A user with this email already exists!");
    }
    
    const user = new Register(req.body);
    
    // Register the user with hashed password
    Register.register(user, req.body.password, (err) => {
      if (err) {
        return res.status(400).render("", { title: "Register", error: err.message });
      }
      res.redirect("/login");
    });
  } catch (err) {
    res.status(500).render("register", { title: "Register", error: "An error occurred during registration." });
    console.error("Register user error:", err);
  }
});

// GET route for the login form
router.get("/login", (req, res) => {
  res.render("login");
});

// POST route for login
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  req.session.user = req.user; // Assign session to logged-in user

  // Redirect to the dashboard after successful login
  res.redirect("/dashboard");
});



// GET route for viewing users
router.get("/viewUser", (req, res) => {
  res.render("registerList");
});

// POST route for handling any additional user actions (e.g., delete, update)
router.post("/viewUser", (req, res) => {
  
});

module.exports = router;
