const fs = require("fs");
const zlib = require("zlib");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/download", (req, res) => {
  const inputFile = "path/to/input.json";
  const compressor = zlib.createBrotliCompress();

  fs.stat(inputFile, (err, stats) => {
    if (err) {
      console.error("An error occurred:", err);
      res.status(500).send("Server error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Encoding", "br");
      res.setHeader("Content-Length", stats.size);

      const readStream = fs.createReadStream(inputFile);
      readStream.pipe(compressor).pipe(res);
    }
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
