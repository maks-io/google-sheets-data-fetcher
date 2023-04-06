import axios from "axios";
import { IRawData } from "../types/IRawData";

export const fetchDataFromOneGoogleSheet = async (
  googleSheetId: string,
  subSheetId: string = "0"
): Promise<IRawData> => {
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${googleSheetId}/gviz/tq?tqx=out:json&tq&gid=${subSheetId}`;
  try {
    const result = await axios.get(url, {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
    const rawData = await result.data
    return JSON.parse(
      rawData.split("google.visualization.Query.setResponse(")[1].slice(0, -2)
    );
  } catch (e) {
    return {} as IRawData;
  }
};
