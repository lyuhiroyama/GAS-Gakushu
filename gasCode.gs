// シート・テンプレートドキュメント・空のフォルダのIDを変数に代入。
const sheetID = "11DKy1mmYHqlF8dLTI0YnTaooq60G_Vzy7q-bcSy05Q8";
const documentID = "1NsuFTzy_G2U5apR2sAP1dMCkTGgN_QEushtsfeEBB8U";
const folderID = "1x1ITeBkaHxwHpmYGRVbbPY8Mx0K5hkZE";


function sender() {

  // 以下のクラスのメソッド使い、シート・ドキュメント・フォルダを変数へ代入。
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName("シート１"); 
  const template = DriveApp.getFileById(documentID);
  const folder = DriveApp.getFolderById(folderID);

  // シート上のデータを'data'へ代入。
  const data = sheet.getDataRange().getValues();

  // 上記の'data'配列の１行目（項目部分）を排除。
  const rows = data.slice(1);


  rows.forEach((row)=> {

    // テンプレートをコピーし、保存先を'folder'に指定。'file'へ代入。
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