import path from "path";
import Xlsx from "xlsx";

import { FileInformation } from "@/types/file";
import { logger } from "@/util/logger";

export function generateExcel(
  filesInformation: Array<FileInformation>,
  projectName: string,
  excelFile: string
) {
  const fileProperties = filesInformation.map((fileInformation) => {
    return {
      "": fileInformation.columnName, // add column name to display the i18n keys
      ...fileInformation.propertiesEditor.toObject(), // TODO get "raw" values of file
    };
  });

  // use SheetJS parser to create the dataset (keys as columns)
  const tempWorksheet = Xlsx.utils.json_to_sheet(fileProperties);

  // convert the dataset to an array of array
  const tempAoa: string[][] = Xlsx.utils.sheet_to_json(tempWorksheet, {
    header: 1,
  });

  // invert columns and rows (to have the keys as rows)
  const transposedAoa = transposeArrayOfArray(tempAoa);

  // create the workbook
  const workbook = Xlsx.utils.book_new();
  const worksheet = Xlsx.utils.aoa_to_sheet(transposedAoa);
  Xlsx.utils.book_append_sheet(workbook, worksheet, "Translations");

  // write the Excel file
  const xlsxFilename = excelFile || `${projectName}.xlsx`;
  Xlsx.writeFileXLSX(workbook, xlsxFilename);
  logger.info("Excel file created: '%s'", path.resolve(xlsxFilename));
}

function transposeArrayOfArray(source: string[][]): string[][] {
  // https://github.com/SheetJS/sheetjs/issues/1729
  let target: string[][] = [];
  for (let i = 0; i < source.length; ++i) {
    for (let j = 0; j < source[i].length; ++j) {
      if (!target[j]) target[j] = [];
      target[j][i] = source[i][j];
    }
  }

  return target;
}

export function readExcelFile(filepath: string): string[][] {
  logger.info("Read excel file: '%s'", path.resolve(filepath));

  // read Excel file
  const workbook = Xlsx.readFile(filepath);
  const worksheet = workbook.Sheets["Translations"];

  // convert the sheet to an array of array
  const tempAoA: string[][] = Xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
  });

  // invert columns and rows (to have the keys as rows)
  //  first array contains the keys
  //  others contains the value for each language
  return transposeArrayOfArray(tempAoA);
}
