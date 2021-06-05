const jwt = require('jsonwebtoken');
// const getImage = require("../Service/ProfileController").getImage;
const deleteImage = require("../Service/ProfileController").deleteImage;
const updateImage = require("../Service/ProfileController").updateImage;
const resetImage = require("../Service/ProfileController").resetImage;

function updateFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        //deleteImage
        

        if(clubID){
            deleteImage(req.params.id);
            console.log(req.params.id);
            //updateImage
            console.log("file name: ", req.file);
            console.log(req.file.filename);
            updateImage(req.file.filename, req.params.id);
            return "file updated";
        }
        else if(clubID == undefined){
            return "Please use after login";
        }
        else{
            return "Please use after login";
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
}

function resetFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        //deleteImage
        deleteImage(req.params.id);

        if(clubID){
            //resetImage
            resetImage(req.params.id);
            return "file rest";
        }
        else if(clubID == undefined){
            return "Please use after login";
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
    // getFile: getFile,
    updateFile: updateFile,
    resetFile: resetFile
}