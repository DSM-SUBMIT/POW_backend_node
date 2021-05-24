const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "pow",
});

// connection.connect(function(err) {
//     if (err) {
//       throw err; // 접속에 실패하면 에러를 throw 합니다.
//     } else {
//       // 접속시 쿼리를 보냅니다.
//       connection.query("SELECT * FROM pow.tbl_club", function(err, rows, fields) {
//         console.log(rows); // 결과를 출력합니다!
//       });
//     }
//   });


// connection.end();

module.exports = connection;