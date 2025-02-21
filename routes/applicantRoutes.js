const express = require("express");
const router = express.Router();
const { searchApplicants } = require("../controllers/applicantController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/search", authenticateToken, searchApplicants);

module.exports = router;
