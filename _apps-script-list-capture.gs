/**
 * Google Apps Script — THSB Website List Capture
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet titled "THSB Website — List Signups"
 * 2. Add these headers in Row 1: Timestamp | Name | Contact | Type | Source
 * 3. Open Extensions → Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Deploy → New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me (your Google account)
 * 8. Who has access: Anyone
 * 9. Click Deploy and authorize when prompted
 * 10. Copy the Web app URL
 * 11. Replace PLACEHOLDER in index.html with the copied URL
 *
 * The script will append each form submission as a new row in the sheet.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.contact || '',
      data.type || '',
      data.source || 'website'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'THSB List Capture endpoint is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
