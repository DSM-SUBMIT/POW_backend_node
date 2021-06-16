const jwt = require('jsonwebtoken');
// const deleteImage = require("../Service/ProfileService").deleteImage;
const updateImage = require("../Service/ProfileService").updateImage;
const resetImage = require("../Service/ProfileService").resetImage;

function updateFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);
        
        //deleteImage
        // deleteImage(req.params.id);

        if(clubID){
            console.log(req.params.id);
            //updateImage
            console.log("file name: ", req.file);
            updateImage(req.file.location, req.params.id);
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
        return error;
    }
}

function resetFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        //deleteImage
        // deleteImage(req.params.id);

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
        return error;
    }
}

module.exports = {
    updateFile: updateFile,
    resetFile: resetFile
}