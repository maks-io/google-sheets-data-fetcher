# google-sheets-data-fetcher

[![Version](https://img.shields.io/npm/v/google-sheets-data-fetcher)](https://www.npmjs.com/package/google-sheets-data-fetcher)

Fetch data from one or multiple google sheets, without any API key.

<img alt="google-sheets-logo" height="60" src="./documentation/gsheetsLogo.png" />
<br />

[<img alt="google-sheets-logo" src="./documentation/gsdfGif01.gif" />](https://youtube.com/shorts/2O8y8PtoRyY?feature=share)

## Highlights

- no api key required
- fetch multiple sheets and/or "sub sheets" at once
- output as json objects or csv
- write data to separate output files
- 2 usages:
  - as classical package/dependency
  - via cli/command line
- small package size ( < 40kB )
- written in typescript
- tested via Jest

## Introduction

[![lib-intro-on-youtube](https://img.youtube.com/vi/tq1TBDGVECU/0.jpg)](https://www.youtube.com/watch?v=tq1TBDGVECU)

## Installation

### For cli / command line usage

If you want to use the `google-sheet-data-fetcher` as a command line tool you have 2 options - you can either use it directly via `npx` or install it globally on your system.

#### npx

```bash
npx google-sheets-data-fetcher [options]
```

#### global install

Via npm:

```bash
npm i -g google-sheets-data-fetcher
```

Via yarn:

```bash
yarn global add google-sheets-data-fetcher
```

### For classical package / dependency usage

Just install via npm...

```bash
npm i google-sheets-data-fetcher --save
```

... or for yarn use:

```bash
yarn add google-sheets-data-fetcher
```

## Usage

First of all, you need to determine a google sheet's ids, simply by looking at its URL.

#### Example URL:

<img alt="google-sheets-url-example" src="./documentation/url.png" />

In this example URL, the part that is underlined in green, would be the main sheet id, while the blue part would be the currently viewed "sub sheet" id.

Use these kind of id's according to your desired outcomes (command line fetch, etc. - details below).

### For cli / command line usage

If you installed it for cli usage as described above, you can afterwards just use it on the command line by typing `gsdf` (short for `google-sheet-data-fetcher`), followed by appropriate options. To see available options, type `gsdf --help`, or check the following table:

| Argument                 | Required? | Description                                                                                                                                                                                                                                                                                                                                                     | example                                                                                                                                                                  |
| ------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-s <sheet-ids>`         | yes       | The `-s` argument must be followed by one main sheet id (required, corresponding to the green part in the example URL above) and can also be followed by additional "sub sheet" ids, separated by `,`. The resulting `<ids>` value must be one continuous string.                                                                                               | `-s abcde,0,468,11111`<br/><br/>This argument would target one google sheet (via `abcde`) and 3 of its sub sheets. Note how there's no space between the individual ids. |
| `-f <output-format>`     | yes       | The `-f` argument represents the desired output format, which can be one of `JSON_RAW`, `JSON_COLUMNS`, `JSON_ROWS`, `CSV`. Note that for the cli usage you can only provide one of these at a time (as opposed to in dependency usage, see further below). Details regarding output formats [can be found below](#output-formats).                             | `-f JSON_COLUMNS`                                                                                                                                                        |
| `-o <output-file-names>` | no        | The `-o` argument is optional and represents the desired output file name. Similarly to the `-s` flag above you can provide multiple output file names by separating them with `,` - and in case you provide multiple (sub) sheets, you also have to - in other words, the number of fetched (sub) sheets must correspond to the number of provided file names. | `-o 1stSheet.json,2ndSheet.json`                                                                                                                                         |

#### Getting data from multiple google sheets at once

The `-s` and `-o` flags above can be provided multiple times, in case you need to fetch data from multiple google sheets at once.

Example:
`gsdf -f JSON_COLUMNS -s 19VnV0Hu0IcwkIqUJndKeUNSSne2OvpLKSSccDiHPmw4,0,1086688112 -s 197U_3ZQaL7jN0sPZvKPhQRN-1tKfwr_VXL09b8W5zpI -o a1.json,a2.json -o b.json
`

### For package / dependency usage

Import the main function like so:

`import { fetchGoogleSheetsData } from "google-sheets-data-fetcher";`

You can then use the `fetchGoogleSheetsData` function by providing 2 arguments, where the 1st describes the sheets to be fetched, and the second one describes the desired output format(s).

Example:

```typescript
const result = fetchGoogleSheetsData(
  // 1st argument:
  [
    {
      sheetId: "19VnV0Hu0IcwkIqUJndKeUNSSne2OvpLKSSccDiHPmw4", // from the example URL above
      subSheetsIds: [
        "0",
        "1086688112", // from the example URL above
        "2100601117",
      ],
      outputFileDestinations: [
        "./1stSubSheet.json",
        "./2ndSubSheet.json",
        "./3rdSubSheet.json",
      ],
    },
    {
      sheetId: "197U_3ZQaL7jN0sPZvKPhQRN-1tKfwr_VXL09b8W5zpI",
      subSheetsIds: ["0", "201058147"],
      outputFileDestinations: ["./firstSubSheet.json", "./secondSubSheet.json"],
    },
  ],
  // 2nd argument:
  ["JSON_COLUMNS"]
);
```

According to the **1st argument** the example above would fetch data from 2 Google Sheets at once, and will also fetch the individual "sub sheets" accordingly, because the `subSheetIds` are being provided. You can also omit this prop - in that case it would only fetch the first sub sheet's data, which always corresponds to `"0"`.

The optional prop `outputFileDestinations` will allow you to not only retrieve the data within the function's return value (as shown here, to be stored in `const result`) but also write the data to separate json files. If you provide this prop, you need to make sure, that the number of provided output file names exactly matches the number of (sub)sheets to be fetched. Also make sure, that you are not re-using certain filenames, as this would lead to overwriting files.

In the **2nd argument** you need to specify an array of one or multiple desired output formats.

Details regarding output formats [can be found below](#output-formats).

If you provide more than one desired output format, the return value will be an object, holding the desired multiple formats, like so:

```typescript
const outputFormats = ["JSON_COLUMNS", "JSON_ROWS"];
// ...
// => result:
// {
//   JSON_COLUMNS: { ... data in column oriented format ... },
//   JSON_ROWS: { ... data in row oriented format ... }
// }
```

### Output formats

<table>
<tr>
<td> value </td> <td> description </td>
</tr>
<tr>
<td>

`"JSON_RAW"`

</td>
<td>
Returns the original format that was retrieved during the package's `fetch` call.

```typescript
interface RawFormat {
  reqId: string;
  sig: string;
  status: string;
  table: {
    cols: { id: string; label: string; type: string }[];
    rows: { c: { v: string }[] }[];
  };
}
```

</td>
<tr>
<td>

`"JSON_COLUMNS"`

</td>
<td>
Returns the data in a column oriented format.

```typescript
interface ColumnFormat {
  [columnKey: string]: {
    id: string;
    label: string;
    type: string;
    rows: {
      [rowKey: string]: { id: number; data: string };
    };
  };
}
```

</td>
</tr>
<tr>
<td>

`"JSON_ROWS"`

</td>
<td>
Returns the data in a row oriented format.

```typescript
interface RowFormat {
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
```

</td>
</tr>
<tr>
<td>

`"CSV"`

</td>
<td>
Returns the data as a single string representing a classical csv format:

`,` as cell separators,

`"` as cell value holders

and newlines `\n` as data entry separators

</td>
</tr>

</table>
