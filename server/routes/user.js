const router = require("express").Router();
const pool = require("../db"); 
const auth = require("../middleware/auth");

// Get User detail from token

router.get("/", auth, async (req, res) => {
    try {
        const user = await pool.query("select user_id, user_name, user_email from users where user_id = $1", [req.user]);
    
        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
})

module.exports = router;