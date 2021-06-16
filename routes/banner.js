const express = require("express");
const multer = require('multer');
const methodOverride = require("method-override");
const getFile = require("../Controllers/BannerController").getFile;
const updateFile = require("../Controllers/BannerController").updateFile;
const resetFile = require("../Controllers/BannerController").resetFile;
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/banners/');
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
});
const uploadWithOriginFN = multer({storage: storage});

const router = express.Router();

router.use(methodOverride("_method"));

router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    if(typeof response == Error){
        res.statusCode(500).json(response);
        return
    }
    res.json(response);
});

router.patch("/:id",(req, res, next)=>{
   const response = resetFile(req, res, next);
   res.json(response);
});

module.exports = router;