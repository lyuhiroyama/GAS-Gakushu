
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

  //不要な列の削除
  deleteUnnecessaryCols(headerText);

  //”日付”列の作成
  const startDate = new Date("2024/04/01");
  createDateCol(startDate);

  //"四半期"列の作成
  createQuarterCol(startDate);

  //"月"列の作成
  createMonthCol();
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

//不要な列の削除
function deleteUnnecessaryCols(header) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const max = sheet.getMaxColumns();
  const headerLength = header.length;
  if(max === headerLength) {
    return;
  }
  sheet.deleteColumns(header.length + 1, max - header.length);
}

//”日付”列の作成
function createDateCol(startDate) {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  const endDate = new Date(startDate.getTime());
  endDate.setFullYear(endDate.getFullYear() + 1);

  const dates = [];
  const formatDate = (date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  for (let date = new Date(startDate.getTime()); date.getTime() < endDate.getTime(); date.setDate(date.getDate() + 1)) {
    dates.push([formatDate(date)]);
  }

  const range = sheet.getRange(2, 1, dates.length, 1);
  range.setValues(dates);
}

//"四半期"列の作成
function createQuarterCol(startDate) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  const startMonth = startDate.getMonth() + 1 // getMonth() は1月を０として返す。

  const getQuarter = (date) => {
    let month = date.getMonth() + 1;
    if (startMonth <= month && month <= startMonth + 2) {
      return 1;
    } else if (startMonth + 3 <= month && month <= startMonth + 5) {
      return 2;
    } else if (startMonth + 6 <= month && month <= startMonth + 8) {
      return 3;
    } else {
      return 4;
    };
  }
  for(const value of values) {
    if(value[COL_DATE] === "日付") {
      continue;
    }
    value[COL_QUARTER] = getQuarter(value[COL_DATE]);
  }
  range.setValues(values);
}


//"月"列の作成
function createMonthCol() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  for(const value of values) {
    if(value[COL_DATE] === "日付") {
      continue;
    }
    value[COL_MONTH] = value[COL_DATE].getMonth() + 1; // getMonth() は1月を０として返す。
  }

  range.setValues(values);
}






