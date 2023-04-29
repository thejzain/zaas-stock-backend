const express = require("express");

const fs = require("fs");
const csv = require("fast-csv");
const stream = fs.createReadStream("output.csv");

const app = express();
const port = 3000;


app.get("/", (req, res) => {
  fs.readFile("output.csv", "utf8", function (err, data) {
    console.log(data);
    let array = data.split("\n");
    let array1 = [];
    let array2 = [];
    for (var i = 1; i < array.length-1; i++) {
        var split = array[i].split(",");  
        array1.push(split[0]); 
        array2.push(split[1]); 
    }
    res.send({arr1: array1 ,arr2: array2});
    
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
