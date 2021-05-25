const express = require("express");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();

const bannerRouter = require("./routes/banner");
const introduceRouter = require("./routes/introduce");
const profileRouter = require("./routes/profile");
const cors = require('cors');

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(helmet());

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    // allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use((req, res)=>{
    console.log(req.headers);
})

app.use("/image",  introduceRouter);
// app.use(`http://${process.env.BASE_URL}/image`, introduceRouter);
app.use("/banner",  bannerRouter);
app.use("/profile",  profileRouter);

app.listen(app.get('port'),()=>{
    console.log("http://localhost:" + app.get('port'));
});

//profile, banner delete 삭제하면 다 날라감?
//profile, banner update 뭐가 문제였는데 기억 안남