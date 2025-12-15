const express = require('express');
const app = express();
require('dotenv').config();
const MYPORT = 7000;

app.use(express.json(),express.urlencoded({extended:true}));

app.listen(MYPORT,()=>console.log(`Listneing on PORT ${MYPORT}`))