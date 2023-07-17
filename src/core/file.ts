import fs from "fs";
import path from "path";
import { PropertiesEditor } from "properties-file/editor";

import { FileInformation } from "@/types/file";
import { logger } from "@/util/logger";

export function getFilesInformationInFolder(
  folderPath: string
): Array<FileInformation> {
  const filesname = listFilesInFolder(folderPath);

  const filesProperties = filesname.map((fileName) => {
    const filePath = path.resolve(path.join(folderPath, fileName));
    const i18nKey = fileName.substring(
      fileName.indexOf("i18n") + 4,
      fileName.indexOf(".properties")
    );

    const fileBuffer = fs.readFileSync(filePath);
    const propertiesEditor = new PropertiesEditor(fileBuffer.toString());

    const fileProperties: FileInformation = {
      fileName: fileName,
      filePath: filePath,
      i18nKey: i18nKey,
      columnName: getColumnName(i18nKey),
      propertiesEditor: propertiesEditor,
    };

    logger.debug(
      "Files information: { fileName: '%s', filePath: '%s', i18nKey: '%s', columnName: '%s' }",
      fileProperties.fileName,
      fileProperties.filePath,
      fileProperties.i18nKey,
      fileProperties.columnName
    );
    return fileProperties;
  });

  return filesProperties;
}

function listFilesInFolder(folderPath: string): Array<string> {
  logger.info("Used path: '%s'", folderPath);

  const files = fs.readdirSync(folderPath);
  logger.info("%d files found: %o", files.length, files);
  return files;
}

function getColumnName(i18nKey: string) {
  if (i18nKey === "") {
    return "default";
  } else {
    return i18nKey.slice(1); // remove first "_"
  }
}

export function getProjectName(folderPath: string): string {
  const folderAbsolutePath = path.resolve(folderPath);
  // get ../../ folder name
  const projectName = path.basename(
    path.dirname(path.dirname(folderAbsolutePath))
  );
  logger.info("Project name: '%s'", projectName);

  return projectName;
}

export function createFileInformationFromColumName(
  columnName: string,
  i18nFolder: string
): FileInformation {
  const i18nKey =
    !columnName || columnName === "default" ? "" : `_${columnName}`;
  const fileName = `i18n${i18nKey}.properties`;
  const filePath = path.resolve(path.join(i18nFolder, fileName));

  return {
    fileName: fileName,
    filePath: filePath,
    i18nKey: i18nKey,
    columnName: columnName,
    propertiesEditor: new PropertiesEditor(""),
  };
}

export function writeFileSync(path: string, content: string) {
  fs.writeFileSync(path, content);
}
