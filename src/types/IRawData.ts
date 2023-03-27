export interface IRawData {
  reqId: string;
  sig: string;
  status: string;
  table: {
    cols: { id: string; label: string; type: string }[];
    rows: { c: { v: string }[] }[];
  };
}
