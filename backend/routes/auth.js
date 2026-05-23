const express = require("express"); //importing express module or library so i can use it in this file to create routes and handle requests and responses
const router = express.Router(); //creating a router object using express.Router() method which will be used to define routes for this module
const User = require("../models/User"); //importing the User model from the models directory so i can interact with the user data in the database
const { body, validationResult } = require("express-validator"); //importing the body and validationResult functions from the express-validator library which will be used for validating incoming request data and handling validation errors respectively
const bcrypt = require("bcryptjs"); //importing the bcryptjs library which will be used for hashing passwords and comparing hashed passwords

const JWT_SECRET = "iNotebook@123"; //defining a constant variable JWT_SECRET which will be used as the secret key for signing JSON Web Tokens (JWTs) for authentication purposes
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser"); //importing the fetchUser middleware from the middleware directory which will be used to authenticate users and retrieve their information based on the JWT token provided in the request headers 



//Route 1: Create a user using POST "/api/auth/createUser". No login required
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(), // validating that the email field is a valid email address
    body("name", "Enter a valid name").isLength({ min: 3 }), // validating that the name field has a minimum length of 5 characters
    body("password", "Enter a valid password").isLength({ min: 5 }), // validating that the password field has a minimum length of 5 characters
  ],
  async (req, res) => {
    let success = false;

    // checking for validation errors and if there are any, returning a 400 Bad Request response with the error details in JSON format
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success,
         errors: "please enter valid credentials" });
    }
    try {
      // check if a user with the same email already exists in the database and if it does, returning a 400 Bad Request response with an error message

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({  success , error: "Sorry a user with this email already exists" });
      }
      const salt = bcrypt.genSaltSync(10); //function for hashing a password
      const secPass = await bcrypt.hashSync(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET); //function for signing a JSON Web Token (JWT) with the provided data and secret key
      console.log(authtoken); //returning token in response

      // res.json({ user });
      res.json({ 
        success: true,
        authtoken });
    } catch (error) {
      console.error(error.message);
      console.log("Some error occured");
      res.status(500).send("Internal Server Error");
    }
  },
);



// Route 2: Authenticate a user using POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(), // validating that the email field is a valid email address
    body("password", "Password cannot be blank").exists(), // validating that the password field exists and is not empty
  ],
  async (req, res) => {
    let success = false;
    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });

      }
      const passwordCompare = await bcrypt.compare(password, user.password); //compare(originalPassword, hashedPassword)
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success: false,  error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  },
);



// Route 3: Get logged in user details using POST "/api/auth/getuser". Login required
router.post(
  "/getUser", fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id; //accessing the user ID from the request object which was set by the fetchUser middleware after authenticating the user using the JWT token
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }

  });
module.exports = router;
