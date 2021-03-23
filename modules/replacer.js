const parse = require("csv-parse");
const fs = require("fs");

exports.getSubstitutions = (substitutionFilename, callback) => {
  let data;

  try {
    data = fs.readFileSync(substitutionFilename);
  } catch (error) {
    callback(`ERROR locating the substitutions file: ${error}`, undefined);
    return;
  }

  try {
    parse(
      data,
      {
        comment: "#",
      },
      function (err, output) {
        substitutions = output;
        callback(err, substitutions);
      }
    );
  } catch (error) {
    callback(`ERROR parsing the substitutions file: ${error}`, undefined);
  }
};
