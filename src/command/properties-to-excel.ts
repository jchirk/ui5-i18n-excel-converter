import { propertiesToExcelOptions } from "@/types/file";
import * as File from "@/core/file";
import * as Xslx from "@/core/xlsx";
import { setLogLevel } from "@/util/logger";

export function propertiesToExcel(
  i18nFolder: string,
  excelFile: string,
  options: propertiesToExcelOptions
) {
  setLogLevel(options.verbose);

  const filesInformation = File.getFilesInformationInFolder(i18nFolder);
  const projectName = File.getProjectName(i18nFolder);

  Xslx.generateExcel(filesInformation, projectName, excelFile);
}
