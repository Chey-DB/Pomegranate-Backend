const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function register(req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword
        const user = await User.createUser(data);
        if (user) {
            res.status(201).json({ user: user });
        } else {
            res.status(400).json({ error: "Failed to create user" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}


async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getUserByUsername(data.username);
        if (user) {
            console.log(user)
            console.log(data)
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (passwordMatch) {
                const token = uuidv4();
                const tokenUpdate = await user.updateToken(user.id, { token: token });
                if (tokenUpdate) {
                    res.status(200).json({ user: tokenUpdate });
                } else {
                    res.status(500).json({ error: "Failed to update user" });
                }
            } else {
                res.status(401).json({ error: "Incorrect password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

async function logout(req, res) {
    try {
        const user = await User.getUserById(req.user.id);
        if (user) {
            const updatedUser = await User.updateUser(user.id, { token: "" });
            if (updatedUser) {
                res.status(200).json({ user: updatedUser });
            } else {
                res.status(500).json({ error: "Failed to update user" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

async function profile(req, res) {
    try {
        const user = await User.getUserByUsername(req.params.username);
        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = { register, login, logout, profile }
