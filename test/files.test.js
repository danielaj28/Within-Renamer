const files = require("../modules/files");

test("files_parseCSV_correct parsed data", () => {
  files.parseCSV(
    "before,after\ntarget,replacement\none,two\napple,banana",
    (response, error) => {
      const target = [
        ["before", "after"],
        ["target", "replacement"],
        ["one", "two"],
        ["apple", "banana"],
      ];
      expect(response).toEqual(target);
      expect(error).toEqual(undefined);
    }
  );
});

test("files_parseCSV_parse failure", () => {
  files.parseCSV(
    "klbjt78*^t^^yuVKjHUyR%E76$93uhougfoe87t2t8tog..,.,.,,\n,rg,erg;,e5y,5\n,5,\n5,h",
    (response, error) => {
      expect(error).toContain(`ERROR parsing CSV data`);
      expect(response).toEqual(undefined);
    }
  );
});
