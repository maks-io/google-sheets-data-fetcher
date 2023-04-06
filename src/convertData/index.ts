import { IOutputFormat } from "../types/IOutputFormat";
import { convertToOutputFormatColumns } from "./convertToOutputFormatColumns.js";
import { convertToOutputFormatRows } from "./convertToOutputFormatRows.js";
import { convertToOutputFormatCSV } from "./convertToOutputFormatCSV.js";
import { IRawData } from "../types/IRawData";
import {
  IResultCollection,
  IResultColumnsOriented,
  IResultCSV,
  IResultRaw,
  IResultRowsOriented,
} from "../types/IResults";

export const convertData = (
  rawData: IRawData,
  outputFormats: IOutputFormat[]
):
  | IResultCollection
  | IResultRaw
  | IResultColumnsOriented
  | IResultRowsOriented
  | IResultCSV
  | { error: true } => {
  if (!rawData || Object.keys(rawData).length === 0) {
    return { error: true };
  }

  const output: IResultCollection = {};

  if (outputFormats.includes("JSON_RAW")) {
    output.JSON_RAW = rawData;
  }

  if (outputFormats.includes("JSON_COLUMNS")) {
    output.JSON_COLUMNS = convertToOutputFormatColumns(rawData);
  }

  if (outputFormats.includes("JSON_ROWS")) {
    output.JSON_ROWS = convertToOutputFormatRows(rawData);
  }

  if (outputFormats.includes("CSV")) {
    output.CSV = convertToOutputFormatCSV(rawData);
  }

  // if only one outputFormat is selected, directly return it, otherwise return collection object:
  return outputFormats.length === 1 ? output[outputFormats[0]] : output;
};
