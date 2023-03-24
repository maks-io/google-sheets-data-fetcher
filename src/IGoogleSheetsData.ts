interface IGoogleSheetsSingleData {
  sheetId: string;
  subSheetsIds?: string[];
  outputFileDestinations?: string[];
}

export type IGoogleSheetsData = IGoogleSheetsSingleData[];
