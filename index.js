require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.Mongo_Url;

app.use(cors());
app.use(bodyparser.json());

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create Model
const Usermodel = mongoose.model("User", UserSchema);

// Register Route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await Usermodel.create({ name, email, password: hashedPassword });
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { email, name: user.name } });
});

// Connect to MongoDB and Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    mongoose.connect(uri)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err.message));
});
