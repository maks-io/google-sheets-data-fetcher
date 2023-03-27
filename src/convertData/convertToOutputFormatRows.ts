import { IRawData } from "../types/IRawData";
import { IResultRowsOriented } from "../types/IResults";

export const convertToOutputFormatRows = (
  rawData: IRawData
): IResultRowsOriented => {
  const {
    table: { rows: rs, cols: cs },
  } = rawData;

  const rows: IResultRowsOriented = {};

  rs.forEach((r, rowIndex) => {
    rows[rowIndex] = {
      id: rowIndex,
      columns: {},
    };
    cs.forEach((column, columnIndex) => {
      const { id, label, type } = column;
      rows[rowIndex].columns[id] = {
        id,
        label,
        type,
        data: r.c[columnIndex]?.v,
      };
    });
  });

  return rows;
};
