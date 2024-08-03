import express from "express";
import formidable from "formidable";
import fs from "fs";
import { invoke } from "./second.js";

const app = express();

import dotenv from "dotenv";
dotenv.config(); // This loads the environment variables from the .env file

app.use(express.json());

function parseFormData(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      //   maxFileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
    });

    // form.maxFileSize = 10 * 1024 * 1024; // Limit file size to 10 MB
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
}

app.post("/upload", async (req, res) => {
  try {
    const { fields, files } = await parseFormData(req);
    const image = files.image;
    console.log(fs.createReadStream(image[0].filepath));
    const data = await invoke(
      image[0].originalFilename,
      fs.createReadStream(image[0].filepath)
    );
    res.status(200).json({ msg: data });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.listen(4040, () => {
  console.log("server is runnuing in 4040");
});
