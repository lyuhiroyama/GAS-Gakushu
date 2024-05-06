
//列番号の固定値
const COL_DATE = 0;
const COL_QUARTER = 1;
const COL_MONTH = 2;
const COL_DAY = 3;
const COL_SALES_TARGET = 4;
const COL_SALES_RESULT = 5;
const COL_VISITORS_NUMBER = 6;
const COL_CUSTOMER_UNIT_PRICE = 7;
const COL_ACHIEVEMENT_RATE = 8;
const COL_MEMO = 9;

//ヘッダーテキストの作成
const headerText = [];
headerText[COL_DATE] = "日付";
headerText[COL_QUARTER] = "四半期";
headerText[COL_MONTH] = "月";
headerText[COL_DAY] = "曜日";
headerText[COL_SALES_TARGET] = "売上目標";
headerText[COL_SALES_RESULT] = "売上実績";
headerText[COL_VISITORS_NUMBER] = "来客数";
headerText[COL_CUSTOMER_UNIT_PRICE] = "客単価";
headerText[COL_ACHIEVEMENT_RATE] = "達成率";
headerText[COL_MEMO] = "備考";


function main() {
  //ファイル名を変更
  const newName = "売上報告書";
  setSpreadsheetName(newName);

  //シート名を変更
  const sheetName = "data";
  setSheetName(sheetName);

  //ヘッダー行の作成
  setHeaderRow();
}


//ファイル名を変更
function setSpreadsheetName(newSpreadsheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.rename(newSpreadsheetName);
}

//シート名を変更
function setSheetName(newSheetName) {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.setName(newSheetName);
}

//ヘッダー行の作成
function setHeaderRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange(1, 1, 1,  headerText.length);
  range.setValues([headerText]);
}





