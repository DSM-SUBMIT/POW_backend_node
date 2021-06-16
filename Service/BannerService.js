const fs = require("fs");
const path = require("path");
const connection = require("../mysql");

// S3껄로 다시 짜야함
// function deleteImage(id){
//     try{
//         connection.query(`SELECT * FROM pow.tbl_club WHERE id = "${id}"`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             console.log(imageName[0].banner_path);
//             if(!(imageName[0].banner_path == "DefaultImage.png")){
//                 fs.unlink(path.join(__dirname, "../public/banners/"+imageName[0].banner_path), (err)=>{
//                     if(err){
//                         console.error(err);
//                     }
//                     console.log("deleted");
//                 });
//             }
//         });
//     }catch(error){
//         console.error(error);
//     }
// }

function updateImage(imageLocation, id){
    connection.query(`UPDATE pow.tbl_club SET banner_path = "${imageLocation}" where id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

function resetImage(id){
    connection.query(`UPDATE pow.tbl_club SET banner_path = "DefaultImage.png" WHERE id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

module.exports = {
    // deleteImage: deleteImage,
    updateImage: updateImage,
    resetImage: resetImage
};