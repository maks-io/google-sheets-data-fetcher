import { IRawData } from "../types/IRawData";
import { IResultColumnsOriented } from "../types/IResults";

export const convertToOutputFormatColumns = (
  rawData: IRawData
): IResultColumnsOriented => {
  const {
    table: { rows: rs, cols: cs },
  } = rawData;

  const columns: IResultColumnsOriented = {};

  cs.forEach((col, colIndex) => {
    columns[col.id] = {
      id: col.id,
      label: col.label,
      type: col.type,
      rows: {},
    };
    rs.forEach((row, rowIndex) => {
      columns[col.id].rows[rowIndex] = {
        id: rowIndex,
        data: row.c[colIndex]?.v,
      };
    });
  });

  return columns;
};
