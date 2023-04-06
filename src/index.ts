import { fetchDataFromOneGoogleSheet } from "./fetchData/fetchDataFromOneGoogleSheet.js";
import { convertData } from "./convertData/index.js";
import { IGoogleSheetsData } from "./types/IGoogleSheetsData";
import { IOutputFormat } from "./types/IOutputFormat";
import * as fs from "fs";

export const fetchGoogleSheetsData = async (
  googleSheetsData: IGoogleSheetsData,
  outputFormats: IOutputFormat[]
) => {
  const promises = googleSheetsData.map(
    async ({ sheetId, subSheetsIds = ["0"], outputFileDestinations }) => {
      const subPromises = subSheetsIds.map(async (ssid, ssidIndex) => {
        const convertedData = convertData(
          await fetchDataFromOneGoogleSheet(sheetId, ssid),
          outputFormats
        );

        const outputFileDestination = outputFileDestinations?.[ssidIndex];
        if (outputFileDestination) {
          fs.writeFileSync(
            outputFileDestination,
            JSON.stringify(convertedData, null, 2),
            "utf-8"
          );
        }

        return convertedData;
      });
      return await Promise.all(subPromises);
    }
  );
  const data = await Promise.all(promises);

  let result = {};
  googleSheetsData.forEach(({ sheetId, subSheetsIds = ["0"] }, sheetIndex) => {
    result[sheetId] = {};
    subSheetsIds.forEach((ssid, subSheetIndex) => {
      if (subSheetsIds.length === 1) {
        result[sheetId] = data[sheetIndex][subSheetIndex];
      } else {
        result[sheetId][ssid] = data[sheetIndex][subSheetIndex];
      }
    });
    if (googleSheetsData.length === 1) {
      result = result[sheetId];
    }
  });

  return result;
};
