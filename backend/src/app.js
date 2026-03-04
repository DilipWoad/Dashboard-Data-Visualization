import express from "express";
import cors from "cors";
export const app = express();

//configuring backend
//handle cors
const currentOrigin = process.env.NODE_ENV==='production' ? process.env.CROSS_ORIGIN : "http://localhost:8080";

const corsOptions = {
    origin:currentOrigin,
     credentials: true
}
app.use(cors(corsOptions))
//handle json data
app.use(express.json({limit:"20kb"}))
//handle data coming url by decoding it from -> %20%dilip%20%email ect
app.use(express.urlencoded({limit:"20kb",extended:true}));

//

//Handling routing 
import dataRouter from "./routes/data.route.js"

app.use('/api/v1/data',dataRouter)
//

//Handing Global Error handler

//