const fs = require("fs");
const readline = require("readline");
const files = require(`./modules/files.js`);
const substitute = require(`./modules/substitutions.js`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let substitutions;

//Load parameters
let [
  program,
  startIn,
  substitutionFilename,
  targetDirectory,
  filenameFilter,
] = process.argv;

if (substitutionFilename == undefined || targetDirectory == undefined) {
  handleError(
    "Invalid parameters, requires node . [substitutionfilename] [target directory]"
  );
}

//Begin
files.readFile(substitutionFilename, (fileData, error) => {
  handleError(error);
  files.parseCSV(fileData, (csvData, error1) => {
    handleError(error1);
    substitutions = csvData;
    console.log(
      `${substitutions.length} substitutions instructions found in ${substitutionFilename}`
    );
    processFiles();
  });
});

//Termination of application upon error
function handleError(error) {
  if (error != undefined) {
    console.error(error);
    rl.close();
  }
}

//Recursively return paths of filenames within target directory and filter
function getAllFiles(path, filenameFilter) {
  let filePaths = [];

  fs.readdirSync(path).forEach((fsObject) => {
    if (fsObject.indexOf(".") != -1) {
      if (
        filenameFilter == undefined ||
        fsObject.indexOf(filenameFilter) != -1
      ) {
        filePaths.push(`${path}${fsObject}`);
      }
    } else {
      filePaths = filePaths.concat(getAllFiles(`${path}${fsObject}\\`));
    }
  });

  return filePaths;
}

//Stats and confirmation before proceeding with replacements
function processFiles() {
  try {
    let filePaths = getAllFiles(targetDirectory, filenameFilter);

    console.log(
      `${filePaths.length} files found in target directory ${targetDirectory}`
    );

    if (filePaths.length == 0) {
      rl.close();
      return;
    }

    rl.question(
      `Are you sure you wish to check ${substitutions.length} substitutions in ${filePaths.length} files? (yes to continue) `,
      function (resp) {
        rl.close();
        if (
          resp.toLocaleLowerCase() == "yes" ||
          resp.toLocaleLowerCase() == "y"
        ) {
          replaceInFiles(filePaths);
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

//read each file, perform substitutions, write file
function replaceInFiles(filePaths) {
  filePaths.forEach((filePath) => {
    fs.readFile(`${filePath}`, {}, (error, data) => {
      if (error != null) {
        console.error(`Error reading file: ${filePath}\nError: ${error}`);
        return;
      }

      data = data.toString();

      substitutions.forEach((substitution) => {
        let [target, replacement] = substitution;
        data = data.replace(target, replacement);
      });

      fs.writeFile(`${filePath}`, data, (error) => {
        if (error != null) {
          console.error(`Error writing to file: ${filePath}\nError: ${error}`);
          return;
        }
        console.log(`${filePath} replacements completed!`);
      });
    });
  });
}
