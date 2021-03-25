# Within-Renamer

![Test](https://github.com/danielaj28/Within-Renamer/actions/workflows/node.js.yml/badge.svg)
![CodeQL](https://github.com/danielaj28/Within-Renamer/actions/workflows/codeql-analysis.yml/badge.svg)

Given a list of substitutions, replace all instances of each substitution target within targeted files. Built for times when you need to replace lots of things in lots of places.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [Node.js](nodejs.org)

## Getting Started

1. `npm i` to install the project dependencies
2. That's it!

<!-- USAGE EXAMPLES -->

## Usage

`node . [substitution file] [target directory] [filename filter]`

Substitution file - should look like this:

```csv
before,after
target,replacement
one,two
apple,banana
```

Target directory - should end with a backslash

Filename filter (optional) - Filters down to only filenames that contain this text

The program will go through each file in the target directory and rename every instance of each target value with it's corrosponding replacement value.

You can try the example replacement with:
`node . .\example\subs.csv .\example\target\`

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Choose an Open Source License](https://choosealicense.com)
- [NodeCSV](https://github.com/adaltas/node-csv)
