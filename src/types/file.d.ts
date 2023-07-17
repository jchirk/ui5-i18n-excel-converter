import { PropertiesEditor } from "properties-file/editor";

type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface propertiesToExcelOptions {
  verbose: boolean;
}
export interface excelToPropertiesOptions {
  verbose: boolean;
  delete: boolean;
}

export interface FileInformation {
  fileName: string;
  filePath: string;
  i18nKey: string;
  columnName: string;
  propertiesEditor: PropertiesEditor
}
