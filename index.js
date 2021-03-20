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
  console.error(`ERROR locating the substitutions file`);
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
      console.debug(output);
    }
  );
} catch (error) {
  console.error(`ERROR parsing the substitutions file`);
}
