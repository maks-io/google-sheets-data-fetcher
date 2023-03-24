import { IRawData } from "../IRawData";

export const convertToOutputFormatColumns = (rawData: IRawData) => {
  const {
    table: { rows: rs, cols: cs },
  } = rawData;

  const columns = {};

  cs.forEach((col, colIndex) => {
    const column = {
      id: col.id,
      label: col.label,
      type: col.type,
      rows: {},
    };
    rs.forEach((row, rowIndex) => {
      column.rows[rowIndex] = row.c[colIndex]?.v;
    });
    columns[col.id] = column;
  });

  return columns;
};
