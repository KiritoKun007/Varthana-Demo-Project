const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

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

// get fav color id

router.get("/favIds", auth, async (req, res) => {

    try {
        const favColorIds = await pool.query(`select * from favcolor where user_id = $1`, [req.user])

        res.json(favColorIds.rows)        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error!!");
    }

})

// Save favourite colors

router.post("/fav", auth, async (req, res) => {
    try {
        const { fav } = req.body

        const userId = req.user

        const colorIds = fav.reduce((prevStr, curr, currIndex) => {

            if(fav.length === currIndex + 1) {
                return prevStr + `('${userId}', ${curr})`
            }

            return prevStr + `('${userId}', ${curr}), `
        }, '')

        console.log(colorIds);

        const favColors = await pool.query(`INSERT INTO favcolor (user_id, color_id) VALUES ${colorIds}`);

        res.json("Selected colors favourited.")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;