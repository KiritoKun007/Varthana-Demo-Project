const router = require("express").Router();
const pool = require("../db");

// Adding colors

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
    try {
        const allColors = await pool.query(`SELECT * FROM colors`);

        res.json(allColors.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// Save favourite colors

router.put("/fav", async (req, res) => {
    try {
        const { fav } = req.body

        const colorIds = fav.join(', ')

        const favColors = await pool.query(`UPDATE colors SET is_fav = TRUE WHERE color_id IN (${colorIds})`);

        res.json("Selected colors favourited.")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;