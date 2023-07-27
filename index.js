const fs = require("fs");
const zlib = require("zlib");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.static("public"));
app.use(cors());

// File paths
const inputFile = "./public/data/yelp_academic_dataset_business.json";
const outputFile = "./public/data/yelp_academic_dataset_business.json.br";

// Compress the JSON file at start-up
const compressFile = () => {
  const compressor = zlib.createBrotliCompress();
  const inputStream = fs.createReadStream(inputFile);
  const outputStream = fs.createWriteStream(outputFile);

  inputStream.pipe(compressor).pipe(outputStream);

  outputStream.on("finish", () => console.log("Compression completed"));
};

// Serve the compressed file
app.get("/download", (req, res) => {
  fs.stat(outputFile, (err, stats) => {
    if (err) {
      console.error("An error occurred:", err);
      res.status(500).send("Server error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Encoding", "br");
      res.setHeader("Content-Length", stats.size);

      const readStream = fs.createReadStream(outputFile);
      readStream.pipe(res);
    }
  });
});

compressFile();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
