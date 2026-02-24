import express from "express";
import cors from "cors";
export const app = express();

//configuring backend
//handle cors
app.use(cors())
//handle json data
app.use(express.json({limit:"20kb"}))
//handle data coming url by decoding it from -> %20%dilip%20%email ect
app.use(express.urlencoded({limit:"20kb",extended:true}));

//

//Handling routing 

//

//Handing Global Error handler

//