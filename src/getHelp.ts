export const getHelp = (inclHeader = false) => {
  let help = "";
  if (inclHeader) {
    help += "Google Sheets Data Fetcher\n";
    help +=
      "A tool to fetch publicly accessible google sheets data without providing api keys\n";
  }
  help += "\n";
  help += "Usage:\n";
  help += "gsdf -f <output_format> -s <sheet_ids> [-o <output_files>]\n";
  help += "\n";
  help += "Options:\n";
  help += "-f\tOutput format\n";
  help += "  \tAccepts one of the following values:\n";
  help += "  \t'JSON_RAW', 'JSON_COLUMNS', 'JSON_ROWS', 'CSV'\n";
  help += "\n";
  help += "-s\tSheet id(s)\n";
  help +=
    "  \tAccepts either only the google sheet's main id, or also its subsheet ids appended, and separated by commas ',' (without spaces!)\n";
  help += "  \tExample: -s mainSheetId,subSheetId1,subSheetId2\n";
  help += "\n";
  help += "-o\tOutput file name(s)\n";
  help +=
    "  \tAccepts a value representing the output file name(s), where the number of provided file names must match the number of resulting sheets, provided via the -s flag above.\n";
  help += "\n";
  help += "Note:\n";
  help +=
    "The -s and -o flags can occur multiple times to allow for fetching multiple sheets at once.\n";
  return help;
};
