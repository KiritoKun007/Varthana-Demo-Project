const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Adding colors
app.post("/colors", async (req, res) => {
    try {
        const { name, hexcode } = req.body;

        const newColor = await pool.query(`INSERT INTO colors (name, hex_code, is_fav) 
                                           VALUES($1, $2, FALSE) RETURNING *`, [name, hexcode])

        res.json(newColor.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// get all colors
app.get("/colors", async (req, res) => {
    try {
        const allColors = await pool.query(`SELECT * FROM colors`);

        res.json(allColors.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// PORT
app.listen(5000, () => {
    console.log("Server has started on port 5000")
});