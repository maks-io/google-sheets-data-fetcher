import { IRawData } from "../IRawData";

export const convertToOutputFormatRows = (rawData: IRawData) => {
  const {
    table: { rows: rs, cols: cs },
  } = rawData;

  const rows = {};

  rs.forEach((r, rowIndex) => {
    const row = {
      id: rowIndex,
      columns: {},
    };
    cs.forEach((column, columnIndex) => {
      const { id, label, type } = column;
      row.columns[id] = { id, label, type, data: r.c[columnIndex]?.v };
    });
    rows[rowIndex] = row;
  });

  return rows;
};
