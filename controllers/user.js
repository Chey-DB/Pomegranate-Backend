const User = require("../models/User");
const bcrpyt = require("bcrypt");


const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const user = await User.createUser(name, username, password);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({ error: "Failed to create user" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
