const path = require('path');
const fs = require("fs");
const connection = require("../mysql");

function setImage(imageLocation, id){
    connection.query(`INSERT INTO pow.tbl_project_introduction_image(path,project_introduction_id) VALUES("${imageLocation}",${id})`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

function updateImage(imageLocation, id){
    connection.query(`UPDATE pow.tbl_project_introduction_image SET PATH = "${imageLocation}" where id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

// S3껄로 다시 짜야함
// function deleteImage(id){
//     connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE id = ${id}`, (error, imageName)=>{
//         if(error){
//             console.error(error);
//         }
//         if(!(imageName[0].path == "DefaultImage.png")){
//             fs.unlink(path.join(__dirname, "../public/images/"+imageName[0].path), (err)=>{
//                 if(err){
//                     console.error(err);
//                 }
//                 console.log("deleted");
//             });
//         }
//     });
// }

function deleteSql(id){
    connection.query(`DELETE FROM pow.tbl_project_introduction_image WHERE id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log("deleteSql results:");
        console.log(results);
    });
}

module.exports = {
    setImage: setImage,
    updateImage: updateImage,
    // deleteImage: deleteImage,
    deleteSql: deleteSql
};