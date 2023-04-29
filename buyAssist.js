const fs = require("fs");

export default function buyAssist(body) {
  let array1 = [];
  let array2 = [];

  fs.readFile("predictionOutput.csv", "utf8", function (err, data) {
    let array = data.split("\n");
    for (var i = 1; i < array.length - 1; i++) {
      var split = array[i].split(",");
      array1.push(split[0]);
      array2.push(split[1]);
    }
  });
  
}
