require("dotenv").config();
const jwt = require("jsonwebtoken")

console.log(process.env.SECRET_KEY)
console.log(jwt.sign({club_id: 1}, process.env.SECRET_KEY));