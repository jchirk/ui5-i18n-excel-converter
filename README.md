# ui5-i18n-excel-converter

CLI tool to convert i18n files to Excel and the other way


## Motivation

The purpose of this tool is to easily communicate with the business part regarding the translations of the UI5 application texts (i18n), especially when there are a lot of different languages.

The tool will generate the Excel file with the keys and the languages.
The translators just have to put the translated texts on the corresponding cells.
Then the tool will import from the Excel file all the translations into the i18n files.

## Installation

Install with npm

```bash
npm install --save-dev ui5-i18n-excel-converter
```
    
## Quick start

Install the tool with npm (see [Installation](#installation)).

Add these scipts to your package.json file :

```javascript
{
    ...
    "scripts": {
        "i18n:export": "ui5-i18n-excel-converter export",   // i18n -> Excel
        "i18n:import": "ui5-i18n-excel-converter import"    // Excel -> i18n
    }
}
```

You can tweak these scripts using the options in [Usage](#usage).
## Usage

```
Usage: ui5-i18n-excel-converter [options] [command]

CLI tool to convert i18n files to Excel and the other way

Options:
  -h, --help                                   display help for command

Commands:
  export [options] [i18n_folder] [excel_file]  convert properties files to Excel
  import [options] <excel_file> [i18n_folder]  import data from Excel file and update the i18n properties files (if the file doesn't exist it will be created)
  help [command]                               display help for command
```

### Export
```
Usage: ui5-i18n-excel-converter export [options] [i18n_folder] [excel_file]

convert properties files to Excel

Arguments:
  i18n_folder    i18n folder (default: "./webapp/i18n")
  excel_file     excel file

Options:
  -v, --verbose  display logs (default: false)
  -h, --help     display help for command
```

### Import
```
Usage: ui5-i18n-excel-converter import [options] [excel_file] [i18n_folder]

import data from Excel file and update the i18n properties files (if the file doesn't exist it will be created)

Arguments:
  excel_file     excel file (default: "./<project_name>.xlsx")
  i18n_folder    i18n folder (default: "./webapp/i18n")

Options:
  -v, --verbose  display logs (default: false)
  -d, --delete   delete properties keys if not present in excel file (default: false)
  -h, --help     display help for command
```
## Acknowledgements
 - [sheetjs](https://github.com/SheetJS/sheetjs)
 - [properties-file](https://github.com/Avansai/properties-file)
 - [commander.js](https://github.com/tj/commander.js)
 - [winston](http://github.com/winstonjs/winston)

## Contributing

Contributions are always welcome!

Please create a pull request on this project.