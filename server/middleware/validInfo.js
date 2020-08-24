module.exports = (req, res, next) => {
    const {email, username, password} = req.body;

    const validEmail = (userEmail) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if(req.path === "/register") {
        console.log(!email.length);

        if(![email, password, username].every(Boolean)) {
            return res.status(401).json({
                status: 401,
                msg: "Missing Credentials. Please fill up the form before submitting."
            });
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if(![email, password].every(Boolean)) {
            return res.status(401).json({
                status: 401,
                msg: "Missing Credentials. Please fill up the form before submitting."
            });
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
}