#!/usr/bin/env node
import updateNotifier from "update-notifier";
import minimist from "minimist";
import packageJson from "../package.json";
import { fetchGoogleSheetsData } from "./index.js";
import { IGoogleSheetsData } from "./types/IGoogleSheetsData";
import { getHelp } from "./getHelp.js";

updateNotifier({
  pkg: packageJson,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
}).notify();

const argv = minimist(process.argv.slice(2));

const { h, help, f, s, o } = argv;

if (h || help) {
  console.log(getHelp(true));
  process.exit(0);
}

const allowedFormats = ["JSON_RAW", "JSON_COLUMNS", "JSON_ROWS"];

if (f && !allowedFormats.includes(f)) {
  console.error(
    `ERROR: Format -f provided was '${f}', but allowed values are: ${allowedFormats.join(
      ", "
    )}`
  );
  console.log(getHelp());
  process.exit(1);
}

if (!s) {
  console.error(`ERROR: A minimum of 1 sheet must be provided via -s flag`);
  console.log(getHelp());
  process.exit(1);
}

const usedSheets = Array.isArray(s) ? s.map((sh) => String(sh)) : [String(s)];

const usedOutputFiles = !o ? undefined : Array.isArray(o) ? o : [o];
if (usedOutputFiles && usedSheets.length !== usedOutputFiles.length) {
  console.error(
    `ERROR: ${usedSheets.length} sheet(s) provided, but ${usedOutputFiles.length} output file destination(s) provided. The number must be equal.`
  );
  console.log(getHelp());
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
