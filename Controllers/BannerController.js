const jwt = require('jsonwebtoken');
const getImage = require("../Service/BannerService").getImage;
const deleteImage = require("../Service/BannerService").deleteImage;
const updateImage = require("../Service/BannerService").updateImage;
const resetImage = require("../Service/BannerService").resetImage;

// function getFile(req, res){
//     console.log(req.params.filename);
//     //getImage
//     return getImage(req.params.filename);
// }

async function getFile(req, res){
    console.log(req.params.filename);
    return new Promise((resolve, reject)=>{
        getImage(req.params.filename).then((path)=>{
            resolve(path);
        });
    });
}

function updateFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);
    
        //deleteImage
        deleteImage(req.params.id);

        if(clubID){
            console.log(req.params.id);
            //updateImage
            updateImage(req.file.filename, req.params.id);
            return "file updated";
        }
        else{
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error)
    }
}

function resetFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        //deleteImage
        deleteImage(req.params.id);

        if(clubID){
            resetImage(req.params.id);
            return "file reset";
        }
        else{
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
}

module.exports = {
    getFile: getFile,
    updateFile: updateFile,
    resetFile: resetFile
}