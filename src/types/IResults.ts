import { IOutputFormat } from "./IOutputFormat";
import { IRawData } from "./IRawData";

export type IResultRaw = IRawData;

export interface IResultColumnsOriented {
  [columnKey: string]: {
    id: string;
    label: string;
    type: string;
    rows: {
      [rowKey: string]: { id: number; data: string };
    };
  };
}

export interface IResultRowsOriented {
  [rowKey: string]: {
    id: number;
    columns: {
      [columnKey: string]: {
        id: string;
        label: string;
        type: string;
        data: string;
      };
    };
  };
}

export type IResultCollection = {
  [format in IOutputFormat]?:
    | IResultRaw
    | IResultColumnsOriented
    | IResultRowsOriented
    | IResultCSV;
};

export type IResultCSV = string;
