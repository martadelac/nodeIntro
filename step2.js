const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error rerading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log(`Error gettinig ${url}: ${err} `);
    process.exit(1);
  }
}

//Modify the code that invoked cat so that, based on the command-line args,
// it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

let path = process.argv[2];

if (path.slice(0, 4) == "http") {
  webCat(path);
} else {
  cat(path);
}
