const dotenv=require('dotenv');
const path = require('path');
// load .env from this file's directory so running node from repo root still finds Backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser')
const connectToDb= require('./db/db');
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



connectToDb();
const userRoutes=require('./routes/userroute')
const captainRoutes=require('./routes/captain.routes')

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.use('/users',userRoutes);
app.use('/captain', captainRoutes);
module.exports=app;