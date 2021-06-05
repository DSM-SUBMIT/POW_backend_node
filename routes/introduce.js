const express = require("express");
const path = require('path');
const multer = require('multer');
const methodOverride = require("method-override");
const getFile = require("../Controllers/IntroduceController").getFile;
const setFile = require("../Controllers/IntroduceController").setFile;
const updateFile = require("../Controllers/IntroduceController").updateFile;
const deleteFile = require("../Controllers/IntroduceController").deleteFile;

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images/');
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
});

const uploadWithOriginFN = multer({storage: storage});

const router = express.Router();

router.use(methodOverride("_method"));

router.post("/:id", uploadWithOriginFN.array('files'), (req, res, next)=>{
    const response = setFile(req, res, next);
    res.json(response);
});

router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    res.json(response);
});

router.delete("/:id", (req, res, next)=>{
    const response = deleteFile(req, res, next);
    console.log(response);
    res.json(response);
});

module.exports = router;