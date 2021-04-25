const files = require("../modules/files");

test("files_getCSV_correct parsed data", () => {
  files.getCSV("./example/subs.csv", (response, error) => {
    const target = [
      ["before", "after"],
      ["target", "replacement"],
      ["one", "two"],
      ["apple", "banana"],
    ];
    expect(response).toEqual(target);
    expect(error).toEqual(undefined);
  });
});

test("files_getCSV_missing file", () => {
  files.getCSV("./example/notfound.csv", (response, error) => {
    expect(error).toContain(`ERROR cannot load data from file`);
    expect(response).toEqual(undefined);
  });
});

test("files_getCSV_parse failure", () => {
  files.getCSV("./test/data/files.bad.csv", (response, error) => {
    expect(error).toContain(`ERROR parsing CSV data from`);
    expect(response).toEqual(undefined);
  });
});
