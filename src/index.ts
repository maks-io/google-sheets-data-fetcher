import { fetchDataFromOneGoogleSheet } from "./fetchData/fetchDataFromOneGoogleSheet";
import { convertData } from "./convertData";
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

  const result = {};
  googleSheetsData.forEach(({ sheetId, subSheetsIds = ["0"] }, sheetIndex) => {
    result[sheetId] = {};
    subSheetsIds.forEach((ssid, subSheetIndex) => {
      result[sheetId][ssid] = data[sheetIndex][subSheetIndex];
    });
  });

  return result;
};
