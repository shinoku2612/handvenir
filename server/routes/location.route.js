const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/location.controller");

router.get("/province", LocationController.getProvince);
router.get("/district", LocationController.getDistrict);
router.get("/commune", LocationController.getCommune);

module.exports = router;
