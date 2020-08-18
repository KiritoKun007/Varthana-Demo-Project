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

router.put("/edit", auth, async (req, res) => {
    try {

        const {username, email} = req.body

        const updatedUser = await pool.query("UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_id, user_name, user_email", [username, email, req.user]);

        res.json(updatedUser.rows[0]);

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
} )

router.put("/inActive", auth, async (req, res) => {
    try {
        
        const inActiveUser = await pool.query("UPDATE users SET is_active = FALSE WHERE user_id = $1", [req.user])

        res.json("Users account is inactivated!!");

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
})

module.exports = router;