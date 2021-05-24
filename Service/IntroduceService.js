const path = require('path');
const fs = require("fs");
const connection = require("../mysql");

async function getImage(filename){
    let imagePath = "";

    await new Promise( async (resolve, reject)=>{
        connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE path = "${filename}"`, (error, imageName)=>{
            if(error){
                console.error(error);
            }
            imagePath = "../public/images/"+imageName[0].path;
            resolve(imagePath);
        });
    })

    return imagePath;
}

function setImage(filename, id){
    connection.query(`INSERT INTO pow.tbl_project_introduction_image(path,project_introduction_id) VALUES("${filename}",${id})`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

function updateImage(filename, id){
    connection.query(`UPDATE pow.tbl_project_introduction_image SET PATH = "${filename}" where id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

function deleteImage(id){
    connection.query(`SELECT * FROM pow.tbl_project_introduction_image WHERE id = ${id}`, (error, imageName)=>{
        if(error){
            console.error(error);
        }
        if(!(imageName[0].path == "DefaultImage.png")){
            fs.unlink(path.join(__dirname, "../public/images/"+imageName[0].path), (err)=>{
                if(err){
                    console.error(err);
                }
                console.log("deleted");
            });
        }
    });
}

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
    getImage: getImage,
    setImage: setImage,
    updateImage: updateImage,
    deleteImage: deleteImage,
    deleteSql: deleteSql
};