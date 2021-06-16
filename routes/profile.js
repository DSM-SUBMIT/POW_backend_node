const express = require("express");
const methodOverride = require("method-override");
const updateFile = require("../Controllers/ProfileController").updateFile;
const resetFile = require("../Controllers/ProfileController").resetFile;

const upload = require("../Multer-S3");

const router = express.Router();

router.use(methodOverride("_method"));

router.put("/:id", upload.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(400).json(response);
        return
    }
    res.json(response);
});

router.patch("/:id",(req, res, next)=>{
    const response = resetFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(400).json(response);
        return
    }
    res.json(response);
});


module.exports = router;