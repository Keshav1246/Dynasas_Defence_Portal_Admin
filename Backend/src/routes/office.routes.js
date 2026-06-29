const express = require("express");
const router = express.Router();
const officeController = require("../controllers/office.controller");

// Auth middleware if needed for admin routes
// We will apply this selectively, GET can be public (with publicView=true) 
// or protected (for admin). For simplicity based on typical REST patterns:
const authMiddleware = require("../middlewares/auth.middleware");

// Public endpoints (we rely on the controller to filter by publicView if passed from public frontend)
router.get("/", officeController.getAllOffices);
router.get("/:id", officeController.getOfficeById);

// Protected Admin endpoints
router.post("/", authMiddleware, officeController.createOffice);
router.put("/:id", authMiddleware, officeController.updateOffice);
router.delete("/:id", authMiddleware, officeController.deleteOffice);

module.exports = router;
