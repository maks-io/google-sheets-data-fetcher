import { IOutputFormat } from "../types/IOutputFormat";
import { convertToOutputFormatColumns } from "./convertToOutputFormatColumns";
import { convertToOutputFormatRows } from "./convertToOutputFormatRows";
import { IRawData } from "../types/IRawData";
import {
  IResultCollection,
  IResultColumnsOriented,
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

  // if only one outputFormat is selected, directly return it, otherwise return collection object:
  return outputFormats.length === 1 ? output[outputFormats[0]] : output;
};
