const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // req.body

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
// app.use(function(req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.headers['token'];
//     if (!token) return next();
  
//     jwt.verify(token, process.env.jwtSecret, (err, user) => {
//         if (err) {
//             return res.status(401).json({
//               success: false,
//               message: 'Please register Log in using a valid email.'
//             });
//         } else {
//             console.log(user)
//             req.user = user;
//             next();
//         }  
//     });
  
// });

// Routes

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// adding, getting and updating colors

app.use("/colors", require("./routes/colors"));

// getting user, updating and active/inactive user

app.use("/user", require("./routes/user"));

// PORT
app.listen(PORT, () => {
    console.log("Server has started on port 6543")
});