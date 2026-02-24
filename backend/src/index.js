//make sure the env are imported first
import './config.js';
import { app } from "./app.js";
import connectDB from './config/db.js';

const port = process.env.PORT || 8000;
console.log(port)

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("⚙ Server Running.. at PORT : ", port);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to the server :: ", err);
  });
