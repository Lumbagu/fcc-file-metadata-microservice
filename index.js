require("dotenv").config()

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const multer = require("multer");
const upload = multer();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.json({ error: "No file to analyse" });
    }

    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
})
