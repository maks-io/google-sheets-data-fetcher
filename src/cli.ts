#!/usr/bin/env node

import { fetchGoogleSheetsData } from "./index";
import { IGoogleSheetsData } from "./IGoogleSheetsData";

const argv = require("minimist")(process.argv.slice(2));

const { f, s, o } = argv;

const allowedFormats = ["JSON_RAW", "JSON_COLUMNS", "JSON_ROWS"];

if (f && !allowedFormats.includes(f)) {
  console.error(
    `ERROR: Format -f provided was '${f}', but allowed values are: ${allowedFormats.join(
      ", "
    )}`
  );
  process.exit(1);
}

if (!s) {
  console.error(`ERROR: A minimum of 1 sheet must be provided via -s flag`);
  process.exit(1);
}

const usedSheets = Array.isArray(s) ? s.map((sh) => String(sh)) : [String(s)];

const usedOutputFiles = !o ? undefined : Array.isArray(o) ? o : [o];
if (usedOutputFiles && usedSheets.length !== usedOutputFiles.length) {
  console.error(
    `ERROR: ${usedSheets.length} sheet(s) provided, but ${usedOutputFiles.length} output file destination(s) provided. The number must be equal.`
  );
  process.exit(1);
}

const inputData: IGoogleSheetsData = [];

usedSheets.forEach((sheetData, sheetIndex) => {
  const sheetDataSplit = sheetData.split(",");
  const usedSubSheetsIds =
    sheetDataSplit.length === 1 ? ["0"] : sheetDataSplit.slice(1);

  let outputFileDestinations;
  if (usedOutputFiles) {
    const outputFileDestinationStr = usedOutputFiles[sheetIndex];
    outputFileDestinations = outputFileDestinationStr.split(",");

    if (usedSubSheetsIds.length !== outputFileDestinations.length) {
      console.error(
        `ERROR: For sheet ${sheetDataSplit[0]} there were ${usedSubSheetsIds.length} subsheet(s) provided, but ${outputFileDestinations.length} output file destination(s) provided. The number must be equal.`
      );
      process.exit(1);
    }
  }

  inputData.push({
    sheetId: sheetDataSplit[0],
    subSheetsIds: usedSubSheetsIds,
    outputFileDestinations: outputFileDestinations,
  });
});

(async () => {
  const result = await fetchGoogleSheetsData(inputData, [f] || ["JSON_RAW"]);
  console.log(JSON.stringify(result, null, 2));
})();
