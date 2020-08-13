const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// adding, getting and updating colors

app.use("/colors", require("./routes/colors"));

// PORT
app.listen(5000, () => {
    console.log("Server has started on port 5000")
});