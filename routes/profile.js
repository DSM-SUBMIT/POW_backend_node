const express = require("express");
const multer = require('multer');
const methodOverride = require("method-override");
const getFile = require("../Controllers/ProfileController").getFile;
const updateFile = require("../Controllers/ProfileController").updateFile;
const resetFile = require("../Controllers/ProfileController").resetFile;
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/profiles/');
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
});
const uploadWithOriginFN = multer({storage: storage});

const router = express.Router();

router.use(methodOverride("_method"));


// router.get("/:filename", async (req, res)=>{
//     const file = getFile(req, res);
//     res.sendFile(file);
// });

// router.get("/:filename", async (req, res)=>{
//     const file = await getFile(req, res);
//     res.sendFile(path.join(__dirname, file));
// });

// router.get("/:filename", async (req, res)=>{
//     console.log(req.params.filename);
//     connection.query(`SELECT * FROM pow.tbl_club WHERE profile_path = "${req.params.filename}"`, (error, imageName)=>{
//         if(error){
//             console.error(error);
//         }
//         console.log(imageName[0].path);
//         res.sendFile(path.join(__dirname, "../public/profiles/"+imageName[0].path));
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

router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
    const response = updateFile(req, res, next);
    res.json(response);
});

// router.put("/:id", uploadWithOriginFN.single('file'), (req, res, next)=>{
//     try{
//         const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

//         connection.query(`SELECT * FROM pow.tbl_club WHERE id = ${req.params.id}"`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             console.log();
//             if(!(imageName[0].profile_path == "DefaultImage.png")){
//                 fs.unlink(path.join(__dirname, "../public/profiles/"+imageName[0].profile_path), (err)=>{
//                     if(err){
//                         console.error(err);
//                     }
//                     console.log("deleted");
//                 });
//             }
//         });

//         if(clubID){
//             console.log(req.params.id);
//             connection.query(`UPDATE pow.tbl_club SET profile_path = "${req.file.filename}" where id = ${req.params.id}`, function (error, results, fields) {
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

router.patch("/:id",(req, res, next)=>{
    const response = resetFile(req, res, next);
    res.json(response);
});

// router.patch("/:id",(req, res, next)=>{
//     try{
//         const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

//         connection.query(`SELECT * FROM pow.tbl_club WHERE id = ${req.params.id}`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             console.log();
//             if(!(imageName[0].profile_path == "DefaultImage.png")){
//                 fs.unlink(path.join(__dirname, "../public/profiles/"+imageName[0].profile_path), (err)=>{
//                     if(err){
//                         console.error(err);
//                     }
//                     console.log("deleted");
//                 });
//             }
//         });

//         if(clubID){
//             connection.query(`UPDATE pow.tbl_club SET profile_path = "DefaultImage.png" WHERE id = ${req.params.id}`, function (error, results, fields) {
//                 if (error){
//                     console.error(error);
//                 }
//                 console.log(results);
//             });
//             return res.json("file rest");
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