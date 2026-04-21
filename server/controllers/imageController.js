const fs = require("fs");

exports.checkPath = (req, res) => {
    const { path } = req.body;
    res.json({ exists: fs.existsSync(path) });
};

exports.uploadImages = (req, res) => {
    res.json({ success: true, count: req.files.length });
};