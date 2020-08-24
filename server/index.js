const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: 'debug' });
const expressLogger = expressPino({ logger });
const PORT = process.env.PORT || 3000;

app.use(expressLogger);

// middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// adding, getting and updating colors

app.use("/colors", require("./routes/colors"));

// getting user, updating and active/inactive user

app.use("/user", require("./routes/user"));

// PORT
app.listen(PORT, () => {
    logger.info("Server has started on port 6543")
});