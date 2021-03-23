const parse = require("csv-parse");
const fs = require("fs");
const readline = require("readline");
const replacer = require(`./modules/replacer.js`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let substitutions;

let [program, startIn, substitutionFilename, targetDirectory] = process.argv;

if (substitutionFilename == undefined || targetDirectory == undefined) {
  console.error(
    "Invalid parameters, requires node . [substitutionfilename] [target directory]"
  );
  rl.close();
  return;
}

replacer.getSubstitutions(substitutionFilename, (error, data) => {
  substitutions = data;

  console.log(
    `${substitutions.length} substitutions instructions found in ${substitutionFilename}`
  );
  getFiles();
});

function getFiles() {
  try {
    let files = fs.readdirSync(targetDirectory);
    console.log(
      `${files.length} files found in target directory ${targetDirectory}`
    );

    rl.question(
      `Are you sure you wish to check ${substitutions.length} substitutions in ${files.length} files? (yes to continue) `,
      function (resp) {
        rl.close();
        if (
          resp.toLocaleLowerCase() == "yes" ||
          resp.toLocaleLowerCase() == "y"
        ) {
          replaceInFiles(files);
        } else {
          console.log(
            "Did not receive a yes to go ahead with the replacements, terminating."
          );
          return;
        }
      }
    );
  } catch (error) {
    console.error(`ERROR Getting files from target directory: ${error}`);
    return;
  }
}

function replaceInFiles(fileNames) {
  fileNames.forEach((fileName) => {
    fs.readFile(`${targetDirectory}${fileName}`, {}, (error, data) => {
      if (error != null) {
        console.error(`Error reading file: ${filename}\nError: ${error}`);
        return;
      }

      data = data.toString();

      substitutions.forEach((substitution) => {
        let [target, replacement] = substitution;
        data = data.replace(target, replacement);
      });

      fs.writeFile(`${targetDirectory}${fileName}`, data, (error) => {
        if (error != null) {
          console.error(`Error writing to file: ${filename}\nError: ${error}`);
          return;
        }
        console.log(`${fileName} replacements completed!`);
      });
    });
  });
}
