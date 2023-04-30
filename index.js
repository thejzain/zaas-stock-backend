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
  console.log(body);

  fs.readFile("predictionOutput.csv", "utf8", function (err, data) {
    let array = data.split("\n");
    let array1 = [];
    let array2 = [];
    for (var i = 1; i < array.length - 1; i++) {
      var split = array[i].split(",");
      array1.push(split[0]);
      array2.push(split[1]);
    }
    if (body.achivement < -20) {
      res.json({ status: "bad" });
    } else if (body.achivement < -5) {
      res.json({ status: "if you will to" });
    } else {
      let flag = 0;
      for (let i = 0; i < array2.length; i++) {
        if (body.lastprice > array2[i]) {
          flag++;
        }
        if (flag != 0) {
          res.json({ status: "better to buy after " + i + 1 + "th month" });
        } else {
          res.json({ status: "no problem" });
        }
      }
    }
  });
});

app.post("/sell", (req, res) => {
  const body = req.body;
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
    for (let i = 0; i < array2.length; i++) {
        let flag = 0;
        if(body.lastprice < array2[i]){
            flag++
        }
        if(flag != 0){
            res.json({status : "better to sell after " + flag  + "months"})
        } else {
            res.json({status: "going to drop better to sell"})
        }
        
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
