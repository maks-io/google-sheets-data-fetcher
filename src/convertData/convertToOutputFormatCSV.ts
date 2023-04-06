import { IRawData } from "../types/IRawData";
import { IResultCSV } from "../types/IResults";
import { convertToOutputFormatRows } from "./convertToOutputFormatRows.js";

export const convertToOutputFormatCSV = (rawData: IRawData): IResultCSV => {
  const asRowFormat = convertToOutputFormatRows(rawData);

  return Object.keys(asRowFormat)
    .map((rowId) =>
      Object.keys(asRowFormat[rowId].columns)
        .map(
          (columnKey) =>
            `"${
              asRowFormat[rowId].columns[columnKey].data?.replace(
                /"/g,
                '\\"'
              ) || ""
            }"`
        )
        .join(",")
    )
    .join("\n");
};
