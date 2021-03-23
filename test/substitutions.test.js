const substitute = require("../modules/substitutions");

test("Parse Good CSV", () => {
  substitute.getSubstitutions("./example/subs.csv", (error, response) => {
    const target = [
      ["before", "after"],
      ["target", "replacement"],
      ["one", "two"],
      ["apple", "banana"],
    ];
    expect(response).toEqual(target);
  });
});

test("Missing Sub File", () => {
  substitute.getSubstitutions("./example/notfound.csv", (error, response) => {
    expect(error).toEqual(
      `ERROR locating the substitutions file: Error: ENOENT: no such file or directory, open './example/notfound.csv'`
    );
    expect(response).toEqual(undefined);
  });
});
