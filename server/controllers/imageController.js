const fs = require("fs");

exports.checkPath = (req, res) => {
    const { path } = req.body;

    //Path mhier in die JSON Datei schreiben
    fs.writeFileSync("path.json", JSON.stringify(path, null, 2));

    res.json({ exists: fs.existsSync(path) });
};

exports.uploadImages = (req, res) => {
    res.json({ success: true, count: req.files.length });
};

exports.getPath = (req, res) => {
    if(!fs.existsSync("path.json")) {
        return res.json({path : ""});
    }

    const data = fs.readFileSync("path.json", "utf-8");
    res.json({path: JSON.parse(data)});
};