const parse = require("csv-parse");
const fs = require("fs");

//Read data from filename
exports.readFile = (filename, callback) => {
  let data;

  try {
    data = fs.readFileSync(filename);
    callback(data, undefined);
  } catch (error) {
    callback(
      undefined,
      `ERROR cannot load data from file ${filename}. ${error}`
    );
    return;
  }
};

//Parse CSV data from string
exports.parseCSV = (data, callback) => {
  try {
    parse(
      data,
      {
        comment: "#",
      },
      function (error1, output) {
        if (error1 != undefined) {
          error1 = `ERROR parsing CSV data. ${error1}`;
        }
        callback(output, error1);
      }
    );
  } catch (error) {
    callback(undefined, `ERROR cannot parse data. ${error}`);
  }
};
