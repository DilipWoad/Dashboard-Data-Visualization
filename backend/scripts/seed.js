import '../src/config.js'
import mongoose from "mongoose";
import { Data } from "../src/models/data.model.js";
import path from "node:path";
import fs from "node:fs";

import { fileURLToPath } from "node:url";

//get my dataModel
const dataModel = Data;

//connect to my remote mongoDb
mongoose.connect(process.env.MONGODB_URI);

//Create a seed func
const seedFunction = async () => {
  try {

    // // get the path of the .json file using node pkg -> 'path'
    // since __dirname is only useable directly if the type is set to commonJs ,
    // so for module type -> 
    console.log("Import meta :: ",import.meta);
    
    // const __filename = fileURLToPath(import.meta.url);
    // console.log("__Filename :: ",__filename)
    // const __dirname = path.dirname(__filename);
    // console.log("__Dirname :: ",__dirname)

    const dataFilePath = path.join(import.meta.dirname, "../data/dashboard.json");
    console.log("Data path :: ", dataFilePath);
    // // now parse the given file to a JSON with fs.readFileSync()
    const jsonDashboardData = JSON.parse(
      fs.readFileSync(dataFilePath, { encoding: "utf-8" }),
    );
    // // delete many ,the previous data from the db , when ever we will call it
    await dataModel.deleteMany();
    console.log("Previous data cleared...");
    // // now insertMany to the db
    await dataModel.insertMany(jsonDashboardData);
    console.log("Database successfully seeded!");
    // // once done exit from process with exitCode as 0
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    // // if any error exit with an exitCode of non-zero
    process.exit(1);
  }
};

seedFunction();
