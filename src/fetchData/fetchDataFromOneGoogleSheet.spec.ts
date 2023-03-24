import { fetchDataFromOneGoogleSheet } from "./fetchDataFromOneGoogleSheet";

describe("tests for fetchDataFromOneGoogleSheet()", () => {
  it.skip("fetches data", async () => {
    const googleSheetId = "1sQnl2t9sP3dkzC903_y_2hYp6M9Otn_iIfmZ9_4DXeY";
    const result = await fetchDataFromOneGoogleSheet(googleSheetId);
    expect(result).toEqual({});
  });
});
