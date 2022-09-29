const args = process.argv.slice(2);
const fs = require("fs");
const request = require("request");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(args[0], (error, response, body) => {
  if (error) {
    console.log("error:", error);
    process.exit();
  }
  if (fs.existsSync(args[1])) {
    rl.question(
      "The file path already exists. Do you want to overwrite it?",
      (answer) => {
        if (answer !== "Y") {
          process.exit();
        }
        rl.close();
        fs.writeFile(args[1], body, (err) => {
          if (err) throw err;
          fs.stat(args[1], (err, stats) => {
            console.log(
              `Downloaded and saved ${stats.size} bytes to ${args[1]}`
            );
          });
        });
      }
    );
  } else {
    fs.writeFile(args[1], body, (err) => {
      if (err) throw err;
      fs.stat(args[1], (err, stats) => {
        console.log(`Downloaded and saved ${stats.size} bytes to ${args[1]}`);
        process.exit();
      });
    });
  }
});
