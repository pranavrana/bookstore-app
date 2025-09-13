const express = require("express");
const User = require("./user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "Admin not found!" });
    }
    if (password !== admin.password) {
      res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
        message: "Authentication successful",
        token,
        user: {
            username: admin.username,
            role: admin.role
        }
    })
  } catch (error) {
    console.error("Failed to login as admin", error);
    res.status(401).send({ message: "Failed to login as admin" });
  }
});
module.exports = router;
