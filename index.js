const express = require("express");
const cors = require("cors");

const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/getgraph", (req, res) => {
  fs.readFile("output.csv", "utf8", function (err, data) {
    console.log(data);
    let array = data.split("\n");
    let array1 = [];
    let array2 = [];
    for (var i = 1; i < array.length - 1; i++) {
      var split = array[i].split(",");
      array1.push(split[0]);
      array2.push(split[1]);
    }
    res.send({ arr1: array1, arr2: array2 });
  });
});

app.post("/buy", (req, res) => {
  const body = req.body;
  let array1 = [];
  let array2 = [];
  console.log(body);

  fs.readFile("predictionOutput.csv", "utf8", function (err, data) {
    let array = data.split("\n");
    for (var i = 1; i < array.length - 1; i++) {
      var split = array[i].split(",");
      array1.push(split[0]);
      array2.push(split[1]);
    }
  });
  if (body.achivement < -20) {
    res.json({ status: "bad" });
  } else if (body.achivement < -5) {
    res.json({ status: "if you will to" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
