const express = require("express");
const path = require('path');
// const fs = require("fs");
const multer = require('multer');
// const jwt = require('jsonwebtoken');
const methodOverride = require("method-override");
// const connection = require("../mysql");
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
// const upload = multer({dest:'public/images/'});
const uploadWithOriginFN = multer({storage: storage});

const router = express.Router();

router.use(methodOverride("_method"));

// router.get("/:filename", async (req, res)=>{
//     const file = await getFile(req, res);
//     res.sendFile(path.join(__dirname, file));
// });

// router.get("/:filename", async (req, res)=>{
//     console.log(req.params.filename);
//     connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE path = "${req.params.filename}"`, (error, imageName)=>{
//         if(error){
//             console.error(error);
//         }
//         console.log(imageName[0].path);
//         res.sendFile(path.join(__dirname, "../public/images/"+imageName[0].path));
//         // fs.unlink(path.join(__dirname, "../public/images/"+imageName[0].path), (err)=>{
//         //     if(err){
//         //         throw error;
//         //     }
//         //     console.log("deleted");
//         // })
//         // try{
//         //     fs.unlinkSync(path.join(__dirname, "../public/images/"+imageName[0].path))
//         // } catch(err){
//         //     console.log(err)
//         // }
//     });
// });

router.post("/:id", uploadWithOriginFN.array('files'), (req, res, next)=>{
    const response = setFile(req, res, next);
    res.json(response);
})

// router.post("/", uploadWithOriginFN.array('files'), (req, res)=>{
//     try{
//         console.log(req.headers.authorization);
//         console.log("\n")
//         console.log(req.headers.authorization.substring(7,))
//         console.log(jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY))

//         const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

//         if(clubID){
//             for(i = 0; i<req.files.length; i++){
//                 console.log("filename "+req.files[i].filename);
//                 connection.query(`INSERT INTO pow.tbl_project_introduction_image(path,project_introduction_id) VALUES("${req.files[i].filename}",${clubID.club_id})`, function (error, results, fields) {
//                     if (error){
//                         console.error(error);
//                     }
//                     console.log(results);
//                 });
//             }
//             res.json("files saved");
//         }
//         else{
//             return res.json("Please use after login");
//         }
//     }catch(error){
//         console.error(error);
//         return next(error)
//     }
// })

router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    res.json(response);
})

// router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
//     try{
//         const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

//         connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE id = "${req.params.id}"`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             if(!(imageName[0].path == "DefaultImage.png")){
//                 fs.unlink(path.join(__dirname, "../public/images/"+imageName[0].path), (err)=>{
//                     if(err){
//                         console.error(err);
//                     }
//                     console.log("deleted");
//                 });
//             }
//         });

//         if(clubID){
//             console.log(req.params.id);
//             connection.query(`UPDATE pow.tbl_project_introduction_image SET PATH = "${req.file.filename}" where id = ${req.params.id}`, function (error, results, fields) {
//                 if (error){
//                     console.error(error);
//                 }
//                 console.log(results);
//             });
//             return res.json("file updated");
//         }
//         else{
//             return res.json("Please use after login");
//         }
//     }catch(error){
//         console.error(error);
//         return next(error);
//     }
// });

router.delete("/:id", (req, res, next)=>{
    const response = deleteFile(req, res, next);
    console.log(response);
    res.json(response);
})

// router.delete("/:id",(req, res, next)=>{
//     try{
//         const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

//         connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE id = "${req.params.id}"`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             fs.unlink(path.join(__dirname, "../public/images/"+imageName[0].path), (err)=>{
//                 if(err){
//                     console.error(err);
//                 }
//                 console.log("deleted");
//             });
//         });

//         if(clubID){
//             connection.query(`DELETE FROM pow.tbl_project_introduction_image WHERE id = ${req.params.id}`, function (error, results, fields) {
//                 if (error){
//                     throw error;
//                 }
//                 console.log(results);
//             });
//             return res.json("file deleted");
//         }
//         else{
//             return res.json("Please use after login");
//         }
//     }catch(error){
//         console.error(error);
//         return next(error);
//     }
// });

module.exports = router;