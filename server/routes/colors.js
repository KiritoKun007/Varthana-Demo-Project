const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");
const query = require("../queries/queries");

// Adding colors

router.post("/", async (req, res) => {
    try {
        const { name, hexcode } = req.body;

        const newColor = await pool.query(query.colors.ADD_COLOR, [name, hexcode])

        res.json(newColor.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// get all colors

router.get("/", async (req, res) => {
    try {
        const allColors = await pool.query(query.colors.GET_ALL_COLORS);

        res.json(allColors.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// get fav color id

router.get("/favIds", auth, async (req, res) => {

    try {
        const favColorIds = await pool.query(query.colors.GET_FAV_COLORS_ID, [req.user])

        res.json(favColorIds.rows)        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error!!");
    }

})

// Save favourite colors

router.post("/fav", auth, async (req, res) => {
    try {
        const { fav } = req.body;

        const userId = req.user;

        const colorIds = fav.reduce((prevStr, curr, currIndex) => {

            if(fav.length === currIndex + 1) {
                return prevStr + `('${userId}', ${curr})`
            }

            return prevStr + `('${userId}', ${curr}), `
        }, '');

        console.log(colorIds);

        const favColors = await pool.query(`${query.colors.SAVE_FAV_COLORS} ${colorIds}`);

        res.json("Selected colors favourited.");

    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;