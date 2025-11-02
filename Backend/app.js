const dotenv=require('dotenv');
dotenv.config();
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


app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.use('/users',userRoutes);
module.exports=app;