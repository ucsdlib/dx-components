const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const MYPORT = 8000;
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json(),express.urlencoded({extended:true}));
// app.use(cookieParser());
require("./routes/routes.spaces")(app)
app.listen(MYPORT,()=>console.log(`Listneing on PORT ${MYPORT}`))