const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.Model");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "N",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role   // 🔥 IMPORTANT
    });

    await newUser.save();

    res.status(201).json({
      status: "Y",
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "N",
      message: "Server Error",
    });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password",
      });
    }

    const isvalidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isvalidPassword) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        role: existingUser.role
      },
      process.env.JWT_SECRET || "mysupersecretkey",
      { expiresIn: "1h" }
    );

    // 🔥 ROLE SEND करना जरूरी है
    res.status(200).json({
      status: "Y",
      message: "Login Successful",
      token,
      role: existingUser.role
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "N",
      message: "Server Error",
    });
  }
});

module.exports = router;