const parse = require("csv-parse");
const fs = require("fs");

//Parse CSV data from filename
exports.getCSV = (filename, callback) => {
  let data;

  try {
    data = fs.readFileSync(filename);
  } catch (error) {
    callback(
      undefined,
      `ERROR cannot load data from file ${filename}. ${error}`
    );
    return;
  }

  try {
    parse(
      data,
      {
        comment: "#",
      },
      function (error1, output) {
        if (error1 != undefined) {
          error1 = `ERROR parsing CSV data from ${filename}. ${error1}`;
        }
        callback(output, error1);
      }
    );
  } catch (error) {
    callback(
      undefined,
      `ERROR cannot parse data from file ${filename}. ${error}`
    );
  }
};
