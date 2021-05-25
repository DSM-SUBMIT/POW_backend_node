const jwt = require('jsonwebtoken');
// const getImage = require("../Service/IntroduceService").getImage;
const setImage = require("../Service/IntroduceService").setImage;
const updateImage = require("../Service/IntroduceService").updateImage;
const deleteImage = require("../Service/IntroduceService").deleteImage;
const deleteSql = require("../Service/IntroduceService").deleteSql;

// async function getFile(req, res){
//     console.log(req.params.filename);
//     return new Promise((resolve, reject)=>{
//         getImage(req.params.filename).then((path)=>{
//             resolve(path);
//         });
//     });
// }

function setFile(req, res, next){
    try{
        // console.log(req.headers.authorization);
        // console.log("\n")
        // console.log(req.headers.authorization.substring(7,))
        // console.log(jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY))

        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            for(i = 0; i<req.files.length; i++){
                console.log("filename "+req.files[i].filename);
                setImage(req.files[i].filename, req.params.id);
            }
            return "files saved";
        }
        else{
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error)
    }
}

function updateFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            deleteImage(req.params.id);
            console.log(req.params.id);
            updateImage(req.file.filename, req.params.id);
            return "file updated";
        }
        else{
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
}

function deleteFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            console.log("run deleteImage");
            deleteImage(req.params.id);
            console.log("run deleteSql");
            deleteSql(req.params.id);
            console.log("return file deleted")
            return "file deleted";
        }
        else{
            console.log("return Please use after login");
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
}

module.exports = {
    // getFile: getFile,
    setFile: setFile,
    updateFile: updateFile,
    deleteFile: deleteFile,
}