import { fetchGoogleSheetsData } from "./index";
import { config } from "./config";
import { IOutputFormat } from "./types/IOutputFormat";

describe("tests for fetchGoogleSheetsData()", () => {
  it("fetches data for one sheet and the first sub sheet (only providing the main sheet id)", async () => {
    const {
      file1: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId }];
    const outputFormats: IOutputFormat[] = ["JSON_COLUMNS"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataBasic[sheetId]["0"].JSON_COLUMNS);
  });
  it("fetches data for one sheet and the first sub sheet (by explicitly providing the sub sheet id)", async () => {
    const {
      file1: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId, subSheetsIds: ["0"] }];
    const outputFormats: IOutputFormat[] = ["JSON_COLUMNS"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataBasic[sheetId]["0"].JSON_COLUMNS);
  });
  it("fetches data for one sheet and the second sub sheet (by explicitly providing the sub sheet id)", async () => {
    const {
      file1: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId, subSheetsIds: ["1086688112"] }];
    const outputFormats: IOutputFormat[] = ["JSON_COLUMNS"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(
      expectedDataBasic[sheetId]["1086688112"].JSON_COLUMNS
    );
  });
  it("fetches data for multiple sheets and multiple sub sheets, and uses one output format", async () => {
    const { file1, file2 } = config.demoFiles;
    const files = [file1, file2];
    const outputFormats: IOutputFormat[] = ["JSON_COLUMNS"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual({
      [file1.sheetId]: {
        ["0"]: expectedDataBasic[file1.sheetId]["0"].JSON_COLUMNS,
        ["1086688112"]:
          expectedDataBasic[file1.sheetId]["1086688112"].JSON_COLUMNS,
        ["2100601117"]:
          expectedDataBasic[file1.sheetId]["2100601117"].JSON_COLUMNS,
      },
      [file2.sheetId]: {
        ["0"]: expectedDataBasic[file2.sheetId]["0"].JSON_COLUMNS,
        ["201058147"]:
          expectedDataBasic[file2.sheetId]["201058147"].JSON_COLUMNS,
      },
    });
  });
  it("fetches data for multiple sheets and multiple sub sheets, and uses multiple output formats", async () => {
    const { file1, file2 } = config.demoFiles;
    const files = [file1, file2];
    const outputFormats: IOutputFormat[] = [
      "JSON_RAW",
      "JSON_COLUMNS",
      "JSON_ROWS",
    ];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataBasic);
  });
  it("fetches data for a sheet with merged cells", async () => {
    const {
      file3: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId }];
    const outputFormats: IOutputFormat[] = ["JSON_COLUMNS", "JSON_ROWS"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataMergedCells);
  });
  it("fetches data for one sheet (1st subsheet only) and turns it into CSV format", async () => {
    const {
      file1: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId }];
    const outputFormats: IOutputFormat[] = ["CSV"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataCSV);
  });
  it("fetches data for a tricky sheet for CSV format", async () => {
    const {
      file4: { sheetId },
    } = config.demoFiles;
    const files = [{ sheetId }];
    const outputFormats: IOutputFormat[] = ["CSV"];
    const result = await fetchGoogleSheetsData(files, outputFormats);

    expect(result).toEqual(expectedDataCSVTricky);
  });
});

const expectedDataBasic = {
  "19VnV0Hu0IcwkIqUJndKeUNSSne2OvpLKSSccDiHPmw4": {
    "0": {
      JSON_RAW: {
        version: "0.6",
        reqId: "0",
        status: "ok",
        sig: "1627032852",
        table: {
          cols: [
            {
              id: "A",
              label: "",
              type: "string",
            },
            {
              id: "B",
              label: "",
              type: "string",
            },
            {
              id: "C",
              label: "",
              type: "string",
            },
            {
              id: "D",
              label: "",
              type: "string",
            },
            {
              id: "E",
              label: "",
              type: "string",
            },
            {
              id: "F",
              label: "",
              type: "string",
            },
            {
              id: "G",
              label: "",
              type: "string",
            },
            {
              id: "H",
              label: "",
              type: "string",
            },
            {
              id: "I",
              label: "",
              type: "string",
            },
            {
              id: "J",
              label: "",
              type: "string",
            },
            {
              id: "K",
              label: "",
              type: "string",
            },
            {
              id: "L",
              label: "",
              type: "string",
            },
            {
              id: "M",
              label: "",
              type: "string",
            },
            {
              id: "N",
              label: "",
              type: "string",
            },
            {
              id: "O",
              label: "",
              type: "string",
            },
            {
              id: "P",
              label: "",
              type: "string",
            },
            {
              id: "Q",
              label: "",
              type: "string",
            },
            {
              id: "R",
              label: "",
              type: "string",
            },
            {
              id: "S",
              label: "",
              type: "string",
            },
            {
              id: "T",
              label: "",
              type: "string",
            },
            {
              id: "U",
              label: "",
              type: "string",
            },
            {
              id: "V",
              label: "",
              type: "string",
            },
            {
              id: "W",
              label: "",
              type: "string",
            },
            {
              id: "X",
              label: "",
              type: "string",
            },
            {
              id: "Y",
              label: "",
              type: "string",
            },
            {
              id: "Z",
              label: "",
              type: "string",
            },
          ],
          rows: [
            {
              c: [
                {
                  v: "monday",
                },
                {
                  v: "tuesday",
                },
                {
                  v: "wednesday",
                },
                {
                  v: "thursday",
                },
                {
                  v: "friday",
                },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  v: null,
                },
              ],
            },
            {
              c: [
                {
                  v: "taskA",
                },
                {
                  v: "taskB",
                },
                {
                  v: "taskC",
                },
                {
                  v: "taskA",
                },
                {
                  v: "taskB",
                },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  v: null,
                },
              ],
            },
            {
              c: [
                {
                  v: "taskB",
                },
                null,
                null,
                {
                  v: "taskC",
                },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  v: null,
                },
              ],
            },
            {
              c: [
                {
                  v: "taskC",
                },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  v: null,
                },
              ],
            },
          ],
          parsedNumHeaders: 0,
        },
      },
      JSON_COLUMNS: {
        A: {
          id: "A",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "monday",
            },
            "1": {
              id: 1,
              data: "taskA",
            },
            "2": {
              id: 2,
              data: "taskB",
            },
            "3": {
              id: 3,
              data: "taskC",
            },
          },
        },
        B: {
          id: "B",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "tuesday",
            },
            "1": {
              id: 1,
              data: "taskB",
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        C: {
          id: "C",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "wednesday",
            },
            "1": {
              id: 1,
              data: "taskC",
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        D: {
          id: "D",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "thursday",
            },
            "1": {
              id: 1,
              data: "taskA",
            },
            "2": {
              id: 2,
              data: "taskC",
            },
            "3": {
              id: 3,
            },
          },
        },
        E: {
          id: "E",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "friday",
            },
            "1": {
              id: 1,
              data: "taskB",
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        F: {
          id: "F",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        G: {
          id: "G",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        H: {
          id: "H",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        I: {
          id: "I",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        J: {
          id: "J",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        K: {
          id: "K",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        L: {
          id: "L",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        M: {
          id: "M",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        N: {
          id: "N",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        O: {
          id: "O",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        P: {
          id: "P",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        Q: {
          id: "Q",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        R: {
          id: "R",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        S: {
          id: "S",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        T: {
          id: "T",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        U: {
          id: "U",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        V: {
          id: "V",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        W: {
          id: "W",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        X: {
          id: "X",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        Y: {
          id: "Y",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
            "2": {
              id: 2,
            },
            "3": {
              id: 3,
            },
          },
        },
        Z: {
          id: "Z",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: null,
            },
            "1": {
              id: 1,
              data: null,
            },
            "2": {
              id: 2,
              data: null,
            },
            "3": {
              id: 3,
              data: null,
            },
          },
        },
      },
      JSON_ROWS: {
        "0": {
          id: 0,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "monday",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
              data: "tuesday",
            },
            C: {
              id: "C",
              label: "",
              type: "string",
              data: "wednesday",
            },
            D: {
              id: "D",
              label: "",
              type: "string",
              data: "thursday",
            },
            E: {
              id: "E",
              label: "",
              type: "string",
              data: "friday",
            },
            F: {
              id: "F",
              label: "",
              type: "string",
            },
            G: {
              id: "G",
              label: "",
              type: "string",
            },
            H: {
              id: "H",
              label: "",
              type: "string",
            },
            I: {
              id: "I",
              label: "",
              type: "string",
            },
            J: {
              id: "J",
              label: "",
              type: "string",
            },
            K: {
              id: "K",
              label: "",
              type: "string",
            },
            L: {
              id: "L",
              label: "",
              type: "string",
            },
            M: {
              id: "M",
              label: "",
              type: "string",
            },
            N: {
              id: "N",
              label: "",
              type: "string",
            },
            O: {
              id: "O",
              label: "",
              type: "string",
            },
            P: {
              id: "P",
              label: "",
              type: "string",
            },
            Q: {
              id: "Q",
              label: "",
              type: "string",
            },
            R: {
              id: "R",
              label: "",
              type: "string",
            },
            S: {
              id: "S",
              label: "",
              type: "string",
            },
            T: {
              id: "T",
              label: "",
              type: "string",
            },
            U: {
              id: "U",
              label: "",
              type: "string",
            },
            V: {
              id: "V",
              label: "",
              type: "string",
            },
            W: {
              id: "W",
              label: "",
              type: "string",
            },
            X: {
              id: "X",
              label: "",
              type: "string",
            },
            Y: {
              id: "Y",
              label: "",
              type: "string",
            },
            Z: {
              id: "Z",
              label: "",
              type: "string",
              data: null,
            },
          },
        },
        "1": {
          id: 1,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "taskA",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
              data: "taskB",
            },
            C: {
              id: "C",
              label: "",
              type: "string",
              data: "taskC",
            },
            D: {
              id: "D",
              label: "",
              type: "string",
              data: "taskA",
            },
            E: {
              id: "E",
              label: "",
              type: "string",
              data: "taskB",
            },
            F: {
              id: "F",
              label: "",
              type: "string",
            },
            G: {
              id: "G",
              label: "",
              type: "string",
            },
            H: {
              id: "H",
              label: "",
              type: "string",
            },
            I: {
              id: "I",
              label: "",
              type: "string",
            },
            J: {
              id: "J",
              label: "",
              type: "string",
            },
            K: {
              id: "K",
              label: "",
              type: "string",
            },
            L: {
              id: "L",
              label: "",
              type: "string",
            },
            M: {
              id: "M",
              label: "",
              type: "string",
            },
            N: {
              id: "N",
              label: "",
              type: "string",
            },
            O: {
              id: "O",
              label: "",
              type: "string",
            },
            P: {
              id: "P",
              label: "",
              type: "string",
            },
            Q: {
              id: "Q",
              label: "",
              type: "string",
            },
            R: {
              id: "R",
              label: "",
              type: "string",
            },
            S: {
              id: "S",
              label: "",
              type: "string",
            },
            T: {
              id: "T",
              label: "",
              type: "string",
            },
            U: {
              id: "U",
              label: "",
              type: "string",
            },
            V: {
              id: "V",
              label: "",
              type: "string",
            },
            W: {
              id: "W",
              label: "",
              type: "string",
            },
            X: {
              id: "X",
              label: "",
              type: "string",
            },
            Y: {
              id: "Y",
              label: "",
              type: "string",
            },
            Z: {
              id: "Z",
              label: "",
              type: "string",
              data: null,
            },
          },
        },
        "2": {
          id: 2,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "taskB",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
            },
            C: {
              id: "C",
              label: "",
              type: "string",
            },
            D: {
              id: "D",
              label: "",
              type: "string",
              data: "taskC",
            },
            E: {
              id: "E",
              label: "",
              type: "string",
            },
            F: {
              id: "F",
              label: "",
              type: "string",
            },
            G: {
              id: "G",
              label: "",
              type: "string",
            },
            H: {
              id: "H",
              label: "",
              type: "string",
            },
            I: {
              id: "I",
              label: "",
              type: "string",
            },
            J: {
              id: "J",
              label: "",
              type: "string",
            },
            K: {
              id: "K",
              label: "",
              type: "string",
            },
            L: {
              id: "L",
              label: "",
              type: "string",
            },
            M: {
              id: "M",
              label: "",
              type: "string",
            },
            N: {
              id: "N",
              label: "",
              type: "string",
            },
            O: {
              id: "O",
              label: "",
              type: "string",
            },
            P: {
              id: "P",
              label: "",
              type: "string",
            },
            Q: {
              id: "Q",
              label: "",
              type: "string",
            },
            R: {
              id: "R",
              label: "",
              type: "string",
            },
            S: {
              id: "S",
              label: "",
              type: "string",
            },
            T: {
              id: "T",
              label: "",
              type: "string",
            },
            U: {
              id: "U",
              label: "",
              type: "string",
            },
            V: {
              id: "V",
              label: "",
              type: "string",
            },
            W: {
              id: "W",
              label: "",
              type: "string",
            },
            X: {
              id: "X",
              label: "",
              type: "string",
            },
            Y: {
              id: "Y",
              label: "",
              type: "string",
            },
            Z: {
              id: "Z",
              label: "",
              type: "string",
              data: null,
            },
          },
        },
        "3": {
          id: 3,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "taskC",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
            },
            C: {
              id: "C",
              label: "",
              type: "string",
            },
            D: {
              id: "D",
              label: "",
              type: "string",
            },
            E: {
              id: "E",
              label: "",
              type: "string",
            },
            F: {
              id: "F",
              label: "",
              type: "string",
            },
            G: {
              id: "G",
              label: "",
              type: "string",
            },
            H: {
              id: "H",
              label: "",
              type: "string",
            },
            I: {
              id: "I",
              label: "",
              type: "string",
            },
            J: {
              id: "J",
              label: "",
              type: "string",
            },
            K: {
              id: "K",
              label: "",
              type: "string",
            },
            L: {
              id: "L",
              label: "",
              type: "string",
            },
            M: {
              id: "M",
              label: "",
              type: "string",
            },
            N: {
              id: "N",
              label: "",
              type: "string",
            },
            O: {
              id: "O",
              label: "",
              type: "string",
            },
            P: {
              id: "P",
              label: "",
              type: "string",
            },
            Q: {
              id: "Q",
              label: "",
              type: "string",
            },
            R: {
              id: "R",
              label: "",
              type: "string",
            },
            S: {
              id: "S",
              label: "",
              type: "string",
            },
            T: {
              id: "T",
              label: "",
              type: "string",
            },
            U: {
              id: "U",
              label: "",
              type: "string",
            },
            V: {
              id: "V",
              label: "",
              type: "string",
            },
            W: {
              id: "W",
              label: "",
              type: "string",
            },
            X: {
              id: "X",
              label: "",
              type: "string",
            },
            Y: {
              id: "Y",
              label: "",
              type: "string",
            },
            Z: {
              id: "Z",
              label: "",
              type: "string",
              data: null,
            },
          },
        },
      },
    },
    "1086688112": {
      JSON_RAW: {
        version: "0.6",
        reqId: "0",
        status: "ok",
        sig: "776943751",
        table: {
          cols: [
            {
              id: "A",
              label: "",
              type: "string",
            },
            {
              id: "B",
              label: "",
              type: "string",
            },
          ],
          rows: [
            {
              c: [
                null,
                {
                  v: "some lost cell 1",
                },
              ],
            },
            {
              c: [
                null,
                {
                  v: "some lost cell 2",
                },
              ],
            },
          ],
          parsedNumHeaders: 0,
        },
      },
      JSON_COLUMNS: {
        A: {
          id: "A",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
            },
            "1": {
              id: 1,
            },
          },
        },
        B: {
          id: "B",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "some lost cell 1",
            },
            "1": {
              id: 1,
              data: "some lost cell 2",
            },
          },
        },
      },
      JSON_ROWS: {
        "0": {
          id: 0,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
              data: "some lost cell 1",
            },
          },
        },
        "1": {
          id: 1,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
            },
            B: {
              id: "B",
              label: "",
              type: "string",
              data: "some lost cell 2",
            },
          },
        },
      },
    },
    "2100601117": {
      JSON_RAW: {
        version: "0.6",
        reqId: "0",
        status: "ok",
        sig: "128801331",
        table: {
          cols: [
            {
              id: "A",
              label: "",
              type: "string",
            },
          ],
          rows: [
            {
              c: [
                {
                  v: "Hello World",
                },
              ],
            },
          ],
          parsedNumHeaders: 0,
        },
      },
      JSON_COLUMNS: {
        A: {
          id: "A",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "Hello World",
            },
          },
        },
      },
      JSON_ROWS: {
        "0": {
          id: 0,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "Hello World",
            },
          },
        },
      },
    },
  },
  "197U_3ZQaL7jN0sPZvKPhQRN-1tKfwr_VXL09b8W5zpI": {
    "0": {
      JSON_RAW: {
        version: "0.6",
        reqId: "0",
        status: "ok",
        sig: "1674099795",
        table: {
          cols: [
            {
              id: "A",
              label: "",
              type: "string",
            },
          ],
          rows: [
            {
              c: [
                {
                  v: "Shopping List",
                },
              ],
            },
            {
              c: [
                {
                  v: "apples",
                },
              ],
            },
            {
              c: [
                {
                  v: "bananas",
                },
              ],
            },
            {
              c: [
                {
                  v: "oranges",
                },
              ],
            },
            {
              c: [
                {
                  v: "walnuts",
                },
              ],
            },
          ],
          parsedNumHeaders: 0,
        },
      },
      JSON_COLUMNS: {
        A: {
          id: "A",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "Shopping List",
            },
            "1": {
              id: 1,
              data: "apples",
            },
            "2": {
              id: 2,
              data: "bananas",
            },
            "3": {
              id: 3,
              data: "oranges",
            },
            "4": {
              id: 4,
              data: "walnuts",
            },
          },
        },
      },
      JSON_ROWS: {
        "0": {
          id: 0,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "Shopping List",
            },
          },
        },
        "1": {
          id: 1,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "apples",
            },
          },
        },
        "2": {
          id: 2,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "bananas",
            },
          },
        },
        "3": {
          id: 3,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "oranges",
            },
          },
        },
        "4": {
          id: 4,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "walnuts",
            },
          },
        },
      },
    },
    "201058147": {
      JSON_RAW: {
        version: "0.6",
        reqId: "0",
        status: "ok",
        sig: "286462470",
        table: {
          cols: [
            {
              id: "A",
              label: "",
              type: "string",
            },
          ],
          rows: [
            {
              c: [
                {
                  v: "open tasks",
                },
              ],
            },
            {
              c: [
                {
                  v: "do laundry",
                },
              ],
            },
            {
              c: [
                {
                  v: "grocery shopping",
                },
              ],
            },
          ],
          parsedNumHeaders: 0,
        },
      },
      JSON_COLUMNS: {
        A: {
          id: "A",
          label: "",
          type: "string",
          rows: {
            "0": {
              id: 0,
              data: "open tasks",
            },
            "1": {
              id: 1,
              data: "do laundry",
            },
            "2": {
              id: 2,
              data: "grocery shopping",
            },
          },
        },
      },
      JSON_ROWS: {
        "0": {
          id: 0,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "open tasks",
            },
          },
        },
        "1": {
          id: 1,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "do laundry",
            },
          },
        },
        "2": {
          id: 2,
          columns: {
            A: {
              id: "A",
              label: "",
              type: "string",
              data: "grocery shopping",
            },
          },
        },
      },
    },
  },
};

const expectedDataMergedCells = {
  JSON_COLUMNS: {
    A: {
      id: "A",
      label: "",
      type: "string",
      rows: {
        "0": {
          id: 0,
          data: "Some merged columns",
        },
        "1": {
          id: 1,
          data: "Some merged rows",
        },
        "2": {
          id: 2,
          data: "Some merged columns + rows",
        },
      },
    },
  },
  JSON_ROWS: {
    "0": {
      id: 0,
      columns: {
        A: {
          id: "A",
          label: "",
          type: "string",
          data: "Some merged columns",
        },
      },
    },
    "1": {
      id: 1,
      columns: {
        A: {
          id: "A",
          label: "",
          type: "string",
          data: "Some merged rows",
        },
      },
    },
    "2": {
      id: 2,
      columns: {
        A: {
          id: "A",
          label: "",
          type: "string",
          data: "Some merged columns + rows",
        },
      },
    },
  },
};

const expectedDataCSV =
  `"monday","tuesday","wednesday","thursday","friday","","","","","","","","","","","","","","","","","","","","",""\n` +
  `"taskA","taskB","taskC","taskA","taskB","","","","","","","","","","","","","","","","","","","","",""\n` +
  `"taskB","","","taskC","","","","","","","","","","","","","","","","","","","","","",""\n` +
  `"taskC","","","","","","","","","","","","","","","","","","","","","","","","",""`;

const expectedDataCSVTricky =
  `"A cell with some \\" included",""\n` +
  `"Another cell with \\" 2 \\" included",""\n` +
  `" ","<- cell with 1 empty space"`;
