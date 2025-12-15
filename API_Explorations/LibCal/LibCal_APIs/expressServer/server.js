const express = require('express');
const app = express();
const cookireParser = require('cookie-parser');
require('dotenv').config();
const MYPORT = 7000;

app.use(express.json(),express.urlencoded({extended:true}));
app.use(cookireParser());
require("./routes/routes.spaces")(app)
app.listen(MYPORT,()=>console.log(`Listneing on PORT ${MYPORT}`))