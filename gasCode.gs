// シート、テンプレートドキュメント、空のフォルダのIDを変数に代入
const sheetID = "11DKy1mmYHqlF8dLTI0YnTaooq60G_Vzy7q-bcSy05Q8";
const documentID = "1NsuFTzy_G2U5apR2sAP1dMCkTGgN_QEushtsfeEBB8U";
const folderID = "1x1ITeBkaHxwHpmYGRVbbPY8Mx0K5hkZE";


function sender() {
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName("シート１");
  const template = DriveApp.getFileById(documentID);
  const folder = DriveApp.getFolderById(folderID);


  const data = sheet.getDataRange().getValues();

  const rows = data.slice(1);
  rows.forEach((row)=> {
    const file = template.makeCopy(folder);
    const document = DocumentApp.openById(file.getId());
    const body = document.getBody();
    body.replaceText("{LAST}",row[0]);
    body.replaceText("{FIRST}",row[1]);
    body.replaceText("{ID}",row[2]);
    body.replaceText("{DATE}",row[3]);
    document.setName(row[0]+"様の予約確認メール");
    Logger.log(row);
  })
}