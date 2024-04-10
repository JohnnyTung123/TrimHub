const express = require("express");
const planController = require("../controllers/plan_controller");

const router = express.Router();

router.post("/", planController.createPlan);
router.get("/:planId", planController.getPlan);
router.get("/", planController.getPlans);
router.put("/:planId", planController.updatePlan);
router.delete("/:planId", planController.deletePlan);

module.exports = router;
