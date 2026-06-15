const express = require("express");

const validate = require("../middlewares/validate.middleware");

const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");

const { registerAdmin, loginAdmin, getAllAdmins } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/users", getAllAdmins);
router.post("/register", validate(registerSchema), registerAdmin);

router.post("/login", validate(loginSchema), loginAdmin);

module.exports = router;
