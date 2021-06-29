const jwt = require('jsonwebtoken');
const setImage = require("../Service/IntroduceService").setImage;
const updateImage = require("../Service/IntroduceService").updateImage;
// const deleteImage = require("../Service/IntroduceService").deleteImage;
const deleteSql = require("../Service/IntroduceService").deleteSql;


function setFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            for(let file of req.files){
                console.log(file)
                console.log("filename "+file.filename);
                setImage(file.location, req.params.id);
            }
            return "files saved";
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

function updateFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            // deleteImage(req.params.id);
            console.log(req.params.id);
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

function deleteFile(req, res, next){
    try{
        const clubID = jwt.verify(req.headers.authorization.substring(7,),process.env.SECRET_KEY);

        if(clubID){
            console.log("run deleteImage");
            // deleteImage(req.params.id);
            console.log("run deleteSql");
            deleteSql(req.params.id);
            console.log("return file deleted")
            return "file deleted";
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
    setFile: setFile,
    updateFile: updateFile,
    deleteFile: deleteFile,
}