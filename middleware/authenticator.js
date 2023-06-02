const User = require('../models/User');

const authenticator = async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"];

        if (userToken == "null") {
            throw new Error("User not authenticated");
        } else {
            const user = await User.getUserByUsername(req.body.username);
            const validToken = await user.getToken();
            if (userToken == validToken) {
                next();
            } else {
                throw new Error("User not authenticated");
            }
        }            
    } catch (e) {
        res.status(403).send({ error: e.message });
    }
}

module.exports = authenticator;
