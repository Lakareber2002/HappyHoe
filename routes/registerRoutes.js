const express = require("express");
const router = express.Router();
const passport = require("passport");
const Register = require("../models/register");

// GET route for the registration form
router.get("/addWorker", (req, res) => {
  res.render("register", { title: "Register" });
});

// POST route for registration
router.post("/addWorker", async (req, res) => {
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
        return res.status(400).render("", { title: "Signup", error: err.message });
      }
      res.redirect("/start");
    });
  } catch (err) {
    res.status(500).render("register", { title: "Signup", error: "An error occurred during registration." });
    console.error("Signup user error:", err);
  }
});

// GET route for the login form
router.get("/start", (req, res) => {
  res.render("login2");
});

// POST route for login
router.post("/start", passport.authenticate("local", { failureRedirect: "/start" }), (req, res) => {
  req.session.user = req.user; // Assign session to logged-in user
  
  // Redirect based on user role
  if (req.user.role === "manager") {
    res.send("dashboard");
  } else {
    res.send("User with that role does not exist in the system");
  }
});

// GET route for logout
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/");
    });
  } else {
    res.status(400).send("No session found");
  }
});

// GET route for viewing users
router.get("/viewUser", (req, res) => {
  res.render("registerList");
});

// POST route for handling any additional user actions (e.g., delete, update)
router.post("/viewUser", (req, res) => {
  // Add logic here as needed (e.g., handling user deletion or updates)
});

module.exports = router;
