const fs = require("fs");
const path = require("path");
const connection = require("../mysql");

// function getImage(filename){
//     connection.query(`SELECT * FROM pow.tbl_club WHERE banner_path = "${filename}"`, (error, imageName)=>{
//         if(error){
//             console.error(err);
//         }
//         console.log(imageName[0].banner_path);
//         return path.join(__dirname, "../public/banners/"+imageName[0].banner_path);
//     });
// }

// async function getImage(filename){
//     let imagePath = "";

//     await new Promise( async (resolve, reject)=>{
//         connection.query(`SELECT * FROM pow.tbl_club WHERE banner_path = "${filename}"`, (error, imageName)=>{
//             if(error){
//                 console.error(error);
//             }
//             imagePath = "../public/banners/"+imageName[0].path;
//             resolve(imagePath);
//         });
//     })

//     return imagePath;
// }

function deleteImage(id){
    try{
        connection.query(`SELECT * FROM pow.tbl_club WHERE id = "${id}"`, (error, imageName)=>{
            if(error){
                console.error(error);
            }
            console.log(imageName[0].banner_path);
            if(!(imageName[0].banner_path == "DefaultImage.png")){
                fs.unlink(path.join(__dirname, "../public/banners/"+imageName[0].banner_path), (err)=>{
                    if(err){
                        console.error(err);
                    }
                    console.log("deleted");
                });
            }
        });
    }catch(error){
        console.error(error);
    }
}

function updateImage(filename, id){
    connection.query(`UPDATE pow.tbl_club SET banner_path = "${filename}" where id = ${id}`, function (error, results, fields) {
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
    getImage: getImage,
    deleteImage: deleteImage,
    updateImage: updateImage,
    resetImage: resetImage
};