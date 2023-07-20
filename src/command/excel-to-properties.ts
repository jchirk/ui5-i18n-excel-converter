import { FileInformation, excelToPropertiesOptions } from "@/types/file";
import { logger, setLogLevel } from "@/util/logger";
import * as File from "@/core/file";
import * as Xslx from "@/core/xlsx";

export function excelToProperties(
  excelFile: string,
  i18nFolder: string,
  options: excelToPropertiesOptions
) {
  setLogLevel(options.verbose);

  if (options.delete) {
    logger.info("Delete flag is ON");
  }

  if (excelFile === "./<project_name>.xlsx") {
    const projectName = File.getProjectName(i18nFolder);
    excelFile = `${projectName}.xlsx`;
  }

  const excelFileAoa = Xslx.readExcelFile(excelFile);
  const i18nFilesInformation = File.getFilesInformationInFolder(i18nFolder);

  const excelKeyArray = excelFileAoa[0];

  excelFileAoa.forEach((column, columnIndex) => {
    // skip first array as it contains the keys
    if (columnIndex === 0) {
      return;
    }

    const columnName = column[0];
    logger.info("Processing column index %d, name %s", columnIndex, columnName);

    // check i18n file information exists, else create one
    const i18nFileInformation = getFileInformation(
      columnName,
      i18nFilesInformation,
      i18nFolder
    );

    // process each language file
    processColumn(column, excelKeyArray, i18nFileInformation);

    if (options.delete) {
      deletePropertiesKeys(excelKeyArray, i18nFileInformation);
    }

    File.writeFileSync(
      i18nFileInformation.filePath,
      i18nFileInformation.propertiesEditor.format()
    );
  });
}

function getFileInformation(
  columnName: string,
  i18nFilesInformation: FileInformation[],
  i18nFolder: string
): FileInformation {
  let i18nFileInformation = i18nFilesInformation.find(
    (i18nFileInformation) => i18nFileInformation.columnName === columnName
  );

  if (i18nFileInformation) {
    logger.info("File '%s' found, updating...", i18nFileInformation.filePath);
  } else {
    i18nFileInformation = File.createFileInformationFromColumName(
      columnName,
      i18nFolder
    );
    logger.info(
      "File '%s' not found, creating one...",
      i18nFileInformation.filePath
    );
  }

  return i18nFileInformation;
}

function processColumn(
  column: string[],
  excelKeyArray: string[],
  i18nFileInformation: FileInformation
) {
  column.forEach((value, valueIndex) => {
    // skip first value as it contains the language key
    if (valueIndex === 0) {
      return;
    }

    const key = excelKeyArray[valueIndex];
    i18nFileInformation.propertiesEditor.upsert(key, value || "");
  });
}

function deletePropertiesKeys(
  excelKeyArray: string[],
  i18nFileInformation: FileInformation
) {
  i18nFileInformation.propertiesEditor.collection.forEach((property) => {
    if (!excelKeyArray.includes(property.key)) {
      i18nFileInformation.propertiesEditor.delete(property.key, true);
    }
  })
}
