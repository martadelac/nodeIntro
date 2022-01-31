const fs = require("fs");
const process = require("process");
const axios = require("axios");

/** handle output: write to file if out given, else print */

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf-8", function (err) {
      if (err) {
        console.log(`Couldn't wrrite ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}
/** read file at path and print it out. */

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error rerading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}
/** read page at URL and print it out. */

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

let path;
let out;

if (process.argv[2] === '--out'){
    out=process.argv[3];
    path=process.argv[4];
} else{
    path = process.argv[2]
}

if (path.slice(0, 4) == "http") {
  webCat(path,out);
} else {
  cat(path,out);
}
