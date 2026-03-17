const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC ROUTES
router.post("/signup", signupUser);
router.post("/login", loginUser);

// 🔒 PROTECTED ROUTE
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;