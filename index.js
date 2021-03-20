const parse = require("csv-parse");
const fs = require("fs");

let substitutions;

let [program, startIn, substitutionFilename, targetDirectory] = process.argv;

if (substitutionFilename == undefined || targetDirectory == undefined) {
  console.error(
    "Invalid parameters, requires node . [substitutionfilename] [target directory]"
  );
  return;
}

//Get substitutions
try {
  substitutions = fs.readFileSync(substitutionFilename);
} catch (error) {
  console.error(`ERROR locating the substitutions file: ${error}`);
  return;
}

//Parse substitutions
try {
  const input = substitutions;

  parse(
    input,
    {
      comment: "#",
    },
    function (err, output) {
      substitutions = output;
      console.log(
        `${substitutions.length} substitutions instructions found in ${substitutionFilename}`
      );
      getFiles();
    }
  );
} catch (error) {
  console.error(`ERROR parsing the substitutions file: ${error}`);
  return;
}

function getFiles() {
  try {
    let files = fs.readdirSync(targetDirectory);
    console.log(
      `${files.length} files found in target directory ${targetDirectory}`
    );
    replaceInFiles(files);
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
