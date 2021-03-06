const router = require("express").Router();
const pool = require("../db");  
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const auth = require("../middleware/auth");

const query = require("../queries/queries");

// registering

router.post("/register", validInfo, async (req, res) => {

    try {

        // 1. destructure the req.body { username, email, password }

        const { username, email, password } = req.body

        // 2. Check if user exists (if user exists then throw error)

        const user = await pool.query(query.auth.GET_USER_FROM_EMAIL, [email])

        if(user.rows.length !== 0) {
            return res.status(401).send({
                status: 401,
                msg: "User already exists!!"
            })
        }

        // 3. Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        // 4. Enter new user inside our database

        const newUser = await pool.query(query.auth.ADD_USER, [username, email, bcryptPassword])

        // res.json(newUser.rows[0])

        // 5. generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})
        
    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server error!!");

    }
})

// login 

router.post("/login", validInfo, async (req, res) => {
    try {
        
        // 1. destructure the req.body

        const {email, password} = req.body;

        // 2. Check if user exist (if not then throw error)

        const user = await pool.query(query.auth.GET_USER_FROM_EMAIL, [email])

        if(user.rows.length === 0) {
            return res.status(401).json({
                status: 401,
                msg: "Password or Email is incorrect."
            });
        }

        // 2.5 Check if it is an active user or not 

        if(!user.rows[0].is_active) {
            return res.status(403).json({
                status: 401,
                msg: "Account is inactived."
            })
        }

        // 3. check if incoming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword) {
            return res.status("401").json({
                status: 401,
                msg: "Password or Email is incorrect."
            });
        }

        // 4. Give the client jwt token 

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!!");
    }
})

// Verify Authentication

router.get("/verify", auth, async (req, res) => {
    try {

        const user = await pool.query(query.auth.VERIFY_USER_FROM_TOKEN, [req.user]);

        res.json({
            isAuth: true,
            expiryTime: req.expiresIn,
            user: user.rows[0]
        });
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");        
    }
})

module.exports = router;