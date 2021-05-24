const fs = require("fs");
const path = require("path");
const connection = require("../mysql");


// function getImage(filename){
//     connection.query(`SELECT * FROM pow.tbl_club WHERE profile_path = "${filename}"`, (error, imageName)=>{
//         if(error){
//             console.error(error);
//         }
//         console.log(imageName[0].path);
//         return path.join(__dirname, "../public/profiles/"+imageName[0].path);
//     });
// }

//이미지
async function getImage(filename){
    let imagePath = "";

    await new Promise( async (resolve, reject)=>{
        connection.query(`SELECT * FROM pow.tbl_club WHERE profile_path = "${filename}"`, (error, imageName)=>{
            if(error){
                console.error(error);
            }
            imagePath = "../public/profiles/"+imageName[0].path;
            resolve(imagePath);
        });
    })

    return imagePath;
}

//이미지 삭제
function deleteImage(id,){
    connection.query(`SELECT * FROM pow.tbl_club WHERE id = ${id}`, (error, imageName)=>{
        if(error){
            console.error(error);
        }
        console.log();
        if(!(imageName[0].profile_path == "DefaultImage.png")){
            fs.unlink(path.join(__dirname, "../public/profiles/"+imageName[0].profile_path), (err)=>{
                if(err){
                    console.error(err);
                }
                console.log("deleted");
            });
        }
    });
}

//이미지 업데이트
function updateImage(filename, id){
    connection.query(`UPDATE pow.tbl_club SET profile_path = "${filename}" where id = ${id}`, function (error, results, fields) {
        if (error){
            console.error(error);
        }
        console.log(results);
    });
}

//이미지 초기화
function resetImage(id){
    connection.query(`UPDATE pow.tbl_club SET profile_path = "DefaultImage.png" WHERE id = ${id}`, function (error, results, fields) {
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
}