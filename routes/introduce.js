const express = require("express");
const methodOverride = require("method-override");
const setFile = require("../Controllers/IntroduceController").setFile;
const updateFile = require("../Controllers/IntroduceController").updateFile;
const deleteFile = require("../Controllers/IntroduceController").deleteFile;

const upload = require("../Multer-S3");

const router = express.Router();

router.use(methodOverride("_method"));

router.post("/:id", upload.array('files'), (req, res, next)=>{
    const response = setFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(400).json(response);
        return
    }
    res.json(response);
});

router.put("/:id", upload.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(400).json(response);
        return
    }
    res.json(response);
});

router.delete("/:id", (req, res, next)=>{
    const response = deleteFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(400).json(response);
        return
    }
    res.json(response);
});

module.exports = router;