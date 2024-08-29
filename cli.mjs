import { Command } from "commander";
import chalk from "chalk";
import * as fs from "fs";
const program = new Command();
// const {chalk} = require("chalk");
// const path = require("path");
let log = console.log;
// let string = path.join(__dirname, "index.js");
// console.log(string);
program
  .name("index")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("fileWordCount")
  .description("Find number of words in a file")
  .argument("<filePath>", "Path of the file")
  .option("-v,--vowels", "Finding number of vowels in the file")
  .action((str, options) => {
    let arr = str.split("/");
    let finalPath = "";
    for (let i = 0; i < arr.length; i++) {
      if (finalPath == "") {
        finalPath = arr[i];
        continue;
      }
      finalPath += "/" + arr[i];
    }
    let temp = finalPath.split("/");
    // console.log(finalPath[finalPath.length - 1]);
    if (!temp[temp.length - 1].endsWith(".txt")) {
      console.log(chalk.red("File not found or invalid path"));
    } else {
      // console.log("true");
      // fs.readFileSync(finalPath, "utf-8", function (err, data) {
      //   if (err) {
      //     log("File not found or invalid path.");
      //   } else {
      //     let finalData = data.split(" ");
      //     log(finalData.length);
      //   }
      // });
      try {
        fs.readFile(finalPath, "utf-8", (err, data) => {
          if (err) {
            log(chalk.red(err));
          } else {
            let finalData = data.split(" ");
            // log(chalk.green(finalData.length));
            let ans = 0;
            for (let i = 0; i < finalData.length; i++) {
              if (finalData[i] != "") {
                ans++;
              }
            }
            log(chalk.green(ans));
            log(finalData);
            let vowelCount = 0;
            if (options.vowels) {
              for (let i = 0; i < finalData.length; i++) {
                for (let j = 0; j < finalData[i].length; j++) {
                  if ("aeiouAEIOU".includes(finalData[i][j])) {
                    vowelCount++;
                  }
                }
              }
              // console.log()
              log(chalk.green("Vowel count is " + vowelCount));
            }
          }
        });
        // console.log(options);
      } catch (err) {
        // log(chalk.colorNames)
        log(chalk.red("File not found or invalid path."));
      }
    }
  });

program.parse();
