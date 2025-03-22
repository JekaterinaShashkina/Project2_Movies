const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../config/database') 

const initModels = require("../models/init-models")  

const models = initModels(db)  


exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await models.users.create({ username, password: hash });
      res.status(201).json({ message: "User registered", user_id: user.user_id });
    } catch (err) {
      res.status(500).json({ message: "Error registering", error: err.message });
    }
  };

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await models.users.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "User not found" });

        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Logged in", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
}