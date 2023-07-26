const fs = require("fs");
const zlib = require("zlib");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());

// File paths
const inputFile = "./public/data/yelp_academic_dataset_business.json";
const outputFile = "./public/data/yelp_academic_dataset_business.json.gz";

// Compress the JSON file at start-up
const compressFile = () => {
  const gzip = zlib.createGzip();
  const inputStream = fs.createReadStream(inputFile);
  const outputStream = fs.createWriteStream(outputFile);

  inputStream.pipe(gzip).pipe(outputStream);

  outputStream.on("finish", () => console.log("Gzip compression completed"));
};

// Serve the compressed file
app.get("/download", (req, res) => {
  fs.stat(outputFile, (err, stats) => {
    if (err) {
      console.error("An error occurred:", err);
      res.status(500).send("Server error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Encoding", "gzip");
      res.setHeader("Content-Length", stats.size);

      const readStream = fs.createReadStream(outputFile);
      readStream.pipe(res);
    }
  });
});

// Serve the uncompressed file
app.get("/download-uncompressed", (req, res) => {
  fs.stat(inputFile, (err, stats) => {
    if (err) {
      console.error("An error occurred:", err);
      res.status(500).send("Server error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Length", stats.size);

      const readStream = fs.createReadStream(inputFile);
      readStream.pipe(res);
    }
  });
});

compressFile();

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
