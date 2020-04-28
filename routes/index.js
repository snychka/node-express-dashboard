const express = require("express");
const router = express.Router();
const fileService = require("../services/select-file-service")
const { getSettings, writeSettings, isValidDir } = require("../services/settings-service.js");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Log Dashboard" });
});

/* GET select file. */
router.get("/select-file", (req, res, next) => {
  res.render("select-file", { title: "Select Log File" });
});

/* GET settings. */
router.get("/settings", (req, res, next) => {
  res.render("settings", { title: "Settings", settings: getSettings() });
});

router.post("/settings", [
  body("defaultDir").custom(dirPath => {
    if (dirPath && !isValidDir(dirPath)) {
      throw new Error("Default directory is not valid")
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("settings", { 
      title: "Settings", 
      errors: errors.array()[0].msg, 
      settings: getSettings() 
    });
  }

  const saved = writeSettings(req.body)
  res.render("settings", { 
    message: saved ? "Settings Saved" : "", 
    errors: saved ? "" : "Settings not saved",
    title: "Settings", 
    settings: getSettings() 
  });
})

/* GET files. */
router.get("/files", (req, res) => fileService.get(req, res))

module.exports = router;
