#! /usr/bin/env node

import { program } from "commander";
import { propertiesToExcel } from "./command/properties-to-excel";
import { excelToProperties } from "./command/excel-to-properties";

program
  .name("ui5-i18n-excel-converter")
  .description("CLI tool to convert i18n files to Excel and the other way");

program
  .command("export")
  .description("convert properties files to Excel")
  .argument("[i18n_folder]", "i18n folder", "./webapp/i18n")
  .argument("[excel_file]", "excel file")
  .option("-v, --verbose", "display logs", false)
  .action(propertiesToExcel);

program
  .command("import")
  .description(
    "import data from Excel file and update the i18n properties files (if the file doesn't exist it will be created)"
  )
  .argument("<excel_file>", "excel file")
  .argument("[i18n_folder]", "i18n folder", "./webapp/i18n")
  .option("-v, --verbose", "display logs", false)
  .option(
    "-d, --delete",
    "delete properties keys if not present in excel file",
    false
  )
  .action(excelToProperties);

program.parse();
