const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const imageController = require("../controllers/imageController");

router.post("/upload", upload.array("bilder"), imageController.uploadImages);
router.post("/uploadPath", imageController.checkPath);
router.get("/path", imageController.getPath)

module.exports = router;