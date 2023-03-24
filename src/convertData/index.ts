import { IOutputFormat } from "../IOutputFormat";
import { convertToOutputFormatColumns } from "./convertToOutputFormatColumns";
import { convertToOutputFormatRows } from "./convertToOutputFormatRows";
import { IRawData } from "../IRawData";

export const convertData = (
  rawData: IRawData,
  outputFormats: IOutputFormat[]
): any => {
  if (!rawData || Object.keys(rawData).length === 0) {
    return { error: true };
  }

  const output: { [format in IOutputFormat]?: any } = {};

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
