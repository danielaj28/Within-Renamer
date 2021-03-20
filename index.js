let [program, startIn, substitutionFilename, targetDirectory] = process.argv;

if (substitutionFilename == undefined || targetDirectory == undefined) {
  console.error(
    "Invalid parameters, requires node . [substitutionfilename] [target directory]"
  );
  return;
}
