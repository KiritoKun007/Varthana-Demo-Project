const router = require("express").Router();
const pool = require("../db"); 
const auth = require("../middleware/auth");
const queries = require("../queries/queries");
const validInfo = require("../middleware/validInfo");

// Get User detail from token

router.get("/", auth, async (req, res) => {
    try {
        const user = await pool.query(queries.auth.VERIFY_USER_FROM_TOKEN, [req.user]);
    
        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
})

router.put("/edit", auth, validInfo, async (req, res) => {
    try {

        const {username, email} = req.body

        const updatedUser = await pool.query(queries.user.UPDATE_USER, [username, email, req.user]);

        res.json(updatedUser.rows[0]);

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
} )

router.put("/inActive", auth, async (req, res) => {
    try {
        
        const inActiveUser = await pool.query(queries.user.INACTIVE_USER, [req.user])

        res.json("Users account is inactivated!!");

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error!!")
    }
})

module.exports = router;