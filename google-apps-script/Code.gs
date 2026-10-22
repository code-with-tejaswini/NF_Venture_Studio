/**
 * NF VENTURE STUDIO — GOOGLE APPS SCRIPT
 * Incubation Application Processor & Automated Email Notification System
 *
 * Organization: Naree Foundation (NF Venture Studio)
 * Target Notification Email: ncfitcell@gmail.com
 *
 * Workflow:
 * 1. Validates incoming application payload from NF Venture Studio website.
 * 2. Saves the application as a new row in the connected Google Sheet.
 * 3. Sends an automated, secure, beautifully branded email notification to ncfitcell@gmail.com.
 * 4. Records the notification delivery status in the spreadsheet.
 * 5. Returns a JSON response with status, reference ID, and confirmation.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
  // Primary email destination for incubation team notifications
  NOTIFICATION_EMAIL: "ncfitcell@gmail.com",
  
  // Organization Details
  STUDIO_NAME: "NF Venture Studio",
  FOUNDATION_NAME: "Naree Foundation",
  HELPLINE_PHONE: "+91 92091 12577",
  PRIMARY_COLOR: "#123B73",   // NF Navy
  ACCENT_COLOR: "#D9A72E",    // NF Gold
  DARK_BG_COLOR: "#0B1F3A",   // NF Deep Navy
  
  // Optional: Set specific spreadsheet ID if this script is NOT container-bound to the sheet
  // If left blank, it automatically uses SpreadsheetApp.getActiveSpreadsheet()
  SPREADSHEET_ID: "",
  
  // Sheet tab name (falls back to active/first sheet if not found)
  SHEET_NAME: "Applications",
  
  // Timezone for formatting timestamps
  TIMEZONE: "Asia/Kolkata",
};

// ============================================================================
// POST REQUEST HANDLER (Receives form submission from website)
// ============================================================================
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: "No post data received. Expected JSON application payload."
      });
    }

    // Parse JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        message: "Malformed JSON payload: " + parseErr.message
      });
    }

    // Basic server-side validation
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const organization = (data.organization || "").trim();
    const track = (data.track || "Student Startup Track").trim();
    const technology = (data.technology || "").trim();
    const stage = (data.stage || "").trim();
    const idea = (data.idea || "").trim();

    if (!name || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Missing required fields. Full Name, Email, and Phone are mandatory."
      });
    }

    // Generate Submission Timestamp & Unique Reference ID
    const now = new Date();
    const formattedTimestamp = Utilities.formatDate(now, CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
    const dateCode = Utilities.formatDate(now, CONFIG.TIMEZONE, "yyyyMMdd");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = "NFVS-" + dateCode + "-" + randomSuffix;

    // Connect to Google Sheet
    const { ss, sheet } = getSpreadsheetAndSheet();
    const spreadsheetUrl = ss ? ss.getUrl() : "";

    // 1. SAVE TO GOOGLE SHEET
    let rowNumber = null;
    let sheetSaved = false;

    try {
      rowNumber = recordApplicationToSheet(sheet, {
        timestamp: formattedTimestamp,
        referenceId: referenceId,
        track: track,
        name: name,
        email: email,
        phone: phone,
        organization: organization,
        technology: technology,
        stage: stage,
        idea: idea,
      });
      sheetSaved = true;
    } catch (sheetErr) {
      console.error("Critical error saving application to Google Sheet:", sheetErr);
      return createJsonResponse({
        success: false,
        message: "Failed to save application to spreadsheet: " + sheetErr.message
      });
    }

    // 2. SEND EMAIL NOTIFICATION TO ncfitcell@gmail.com
    let emailSent = false;
    let emailErrorMsg = null;

    try {
      sendApplicationNotificationEmail({
        name: name,
        email: email,
        phone: phone,
        organization: organization,
        track: track,
        technology: technology,
        stage: stage,
        idea: idea,
        timestamp: formattedTimestamp,
        referenceId: referenceId,
        rowNumber: rowNumber,
        spreadsheetUrl: spreadsheetUrl,
      });
      emailSent = true;
      updateNotificationStatus(sheet, rowNumber, "Email Sent (" + formattedTimestamp + ")");
    } catch (emailErr) {
      console.error("Email notification failed for application " + referenceId + ":", emailErr);
      emailErrorMsg = emailErr.message || String(emailErr);
      updateNotificationStatus(sheet, rowNumber, "Email Failed: " + emailErrorMsg);
    }

    // 3. RETURN RESPONSE TO WEBSITE
    return createJsonResponse({
      success: true,
      message: "Application submitted successfully",
      referenceId: referenceId,
      rowNumber: rowNumber,
      sheetSaved: sheetSaved,
      emailSent: emailSent,
      emailError: emailErrorMsg || undefined
    });

  } catch (globalErr) {
    console.error("Unexpected error in doPost:", globalErr);
    return createJsonResponse({
      success: false,
      message: "Internal server error: " + globalErr.message
    });
  }
}

// ============================================================================
// GET REQUEST HANDLER (Health-Check & Service Verification)
// ============================================================================
function doGet(e) {
  try {
    const { ss, sheet } = getSpreadsheetAndSheet();
    return createJsonResponse({
      status: "online",
      service: "NF Venture Studio Incubation Application Service",
      targetNotificationEmail: CONFIG.NOTIFICATION_EMAIL,
      spreadsheetName: ss ? ss.getName() : "N/A",
      sheetTab: sheet ? sheet.getName() : "N/A",
      totalApplications: sheet ? Math.max(0, sheet.getLastRow() - 1) : 0,
      timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss 'IST'"),
      version: "2.0.0"
    });
  } catch (err) {
    return createJsonResponse({
      status: "online_with_notice",
      service: "NF Venture Studio Incubation Application Service",
      notice: err.message,
      timestamp: new Date().toISOString()
    });
  }
}

// ============================================================================
// SPREADSHEET HELPER FUNCTIONS
// ============================================================================
function getSpreadsheetAndSheet() {
  let ss = null;

  // 1. Try explicit ID if configured
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim() !== "") {
    ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
  }

  // 2. Try container-bound active spreadsheet
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      ss = null;
    }
  }

  // 3. Try ScriptProperties
  if (!ss) {
    const propId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    if (propId) {
      ss = SpreadsheetApp.openById(propId);
    }
  }

  if (!ss) {
    throw new Error("Target Google Sheet not found. If this is a standalone Apps Script project, enter SPREADSHEET_ID in CONFIG or Script Properties.");
  }

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.getActiveSheet() || ss.getSheets()[0];
  }

  return { ss, sheet };
}

/**
 * Appends application to the sheet preserving existing structure
 */
function recordApplicationToSheet(sheet, data) {
  // If the sheet is brand new/empty, initialize standard headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Track",
      "Full Name",
      "Email Address",
      "Phone / WhatsApp",
      "Organization / College",
      "Technology Domain",
      "Current Stage",
      "Idea / Project Overview",
      "Reference ID",
      "Notification Status"
    ]);
    sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#EAF1F9");
    sheet.setFrozenRows(1);
  }

  const numCols = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, Math.max(numCols, 1)).getValues()[0];

  let rowValues = [];

  // If existing headers match standard format, map dynamically to existing column positions
  if (headers && headers.length >= 8 && String(headers[0]).toLowerCase().indexOf("time") !== -1) {
    rowValues = new Array(headers.length).fill("");
    
    for (let c = 0; c < headers.length; c++) {
      const h = String(headers[c] || "").trim().toLowerCase();
      if (h.indexOf("time") !== -1 || h.indexOf("date") !== -1) rowValues[c] = data.timestamp;
      else if (h.indexOf("track") !== -1 || h.indexOf("program") !== -1) rowValues[c] = data.track;
      else if (h.indexOf("name") !== -1 || h.indexOf("applicant") !== -1) rowValues[c] = data.name;
      else if (h.indexOf("email") !== -1) rowValues[c] = data.email;
      else if (h.indexOf("phone") !== -1 || h.indexOf("contact") !== -1 || h.indexOf("whatsapp") !== -1) rowValues[c] = data.phone;
      else if (h.indexOf("org") !== -1 || h.indexOf("college") !== -1 || h.indexOf("institution") !== -1 || h.indexOf("university") !== -1) rowValues[c] = data.organization;
      else if (h.indexOf("tech") !== -1 || h.indexOf("domain") !== -1) rowValues[c] = data.technology;
      else if (h.indexOf("stage") !== -1) rowValues[c] = data.stage;
      else if (h.indexOf("idea") !== -1 || h.indexOf("project") !== -1 || h.indexOf("desc") !== -1) rowValues[c] = data.idea;
      else if (h.indexOf("ref") !== -1 || h.indexOf("id") !== -1) rowValues[c] = data.referenceId;
      else if (h.indexOf("notification") !== -1 || h.indexOf("status") !== -1) rowValues[c] = "Processing";
    }

    // Ensure timestamp is always recorded in first column
    if (rowValues[0] === "") rowValues[0] = data.timestamp;
  } else {
    // Standard append array preserving original 9 columns, with reference ID and status appended
    rowValues = [
      data.timestamp,
      data.track,
      data.name,
      data.email,
      data.phone,
      data.organization,
      data.technology,
      data.stage,
      data.idea,
      data.referenceId,
      "Processing"
    ];
  }

  sheet.appendRow(rowValues);
  return sheet.getLastRow();
}

/**
 * Updates notification status in the sheet without altering original fields
 */
function updateNotificationStatus(sheet, rowNumber, statusText) {
  if (!sheet || !rowNumber) return;
  try {
    const numCols = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, numCols).getValues()[0];
    let statusCol = -1;

    for (let c = 0; c < headers.length; c++) {
      const h = String(headers[c] || "").toLowerCase();
      if (h.indexOf("notification") !== -1 || h.indexOf("status") !== -1) {
        statusCol = c + 1;
        break;
      }
    }

    if (statusCol !== -1) {
      sheet.getRange(rowNumber, statusCol).setValue(statusText);
    } else {
      // Add status column in the next available column
      const newCol = numCols + 1;
      sheet.getRange(1, newCol).setValue("Notification Status").setFontWeight("bold");
      sheet.getRange(rowNumber, newCol).setValue(statusText);
    }
  } catch (err) {
    console.error("Could not update status cell:", err);
  }
}

// ============================================================================
// EMAIL NOTIFICATION SENDER
// ============================================================================
function sendApplicationNotificationEmail(app) {
  const recipient = CONFIG.NOTIFICATION_EMAIL;
  const subject = "New NF Venture Studio Incubation Application — " + app.name;
  
  // Format domain label nicely
  const domainLabels = {
    AI: "AI & Machine Learning",
    IoT: "IoT & Embedded Systems",
    Robotics: "Robotics & Automation",
    Electronics: "Electronics & Hardware",
    DeepTech: "Deep-Tech Academic IP Translation",
    CampusHub: "Campus Innovation Hub / Institutional"
  };
  const readableDomain = domainLabels[app.technology] || app.technology || "Not specified";

  // Build Plain-Text Fallback
  const plainTextBody = [
    "============================================================",
    "NEW INCUBATION APPLICATION RECEIVED — " + CONFIG.STUDIO_NAME,
    "Naree Foundation Initiative",
    "============================================================",
    "",
    "INTERNAL REMINDER:",
    "Please review this application and contact the applicant within 48 hours of submission.",
    "",
    "APPLICATION DETAILS:",
    "------------------------------------------------------------",
    "• Reference ID:      " + app.referenceId,
    "• Submission Time:   " + app.timestamp + " (IST)",
    "• Incubation Track:  " + app.track,
    "• Applicant Name:    " + app.name,
    "• Email Address:     " + app.email,
    "• Contact Phone:     " + app.phone,
    "• Institution / Org: " + (app.organization || "N/A"),
    "• Technology Domain: " + readableDomain,
    "• Current Stage:     " + (app.stage || "Not specified"),
    "",
    "PROJECT / IDEA OVERVIEW:",
    "------------------------------------------------------------",
    app.idea || "No brief overview provided.",
    "",
    "------------------------------------------------------------",
    app.spreadsheetUrl ? "View Google Sheet: " + app.spreadsheetUrl : "",
    "Helpline: " + CONFIG.HELPLINE_PHONE,
    "============================================================"
  ].filter(function(line) { return line !== ""; }).join("\n");

  // Build Elegant, Responsive HTML Email
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #172334; line-height: 1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4F6F9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; border: 1px solid #DCE3EC; box-shadow: 0 4px 14px rgba(18, 59, 115, 0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0B1F3A; padding: 26px 30px; border-bottom: 3px solid #D9A72E; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: rgba(217, 167, 46, 0.18); color: #D9A72E; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; border: 1px solid rgba(217, 167, 46, 0.35);">
                      Incubation Portal Notification
                    </span>
                    <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 10px 0 4px 0; letter-spacing: -0.3px;">
                      New Incubation Application Received
                    </h1>
                    <p style="color: #94BAE9; font-size: 13px; margin: 0; font-weight: 500;">
                      NF Venture Studio &middot; Naree Foundation
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 48-Hour Review Callout (Prominent Action Box) -->
          <tr>
            <td style="padding: 20px 30px 0 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FFFDF5; border: 1px solid #E8D6A7; border-left: 4px solid #D9A72E; border-radius: 8px; padding: 14px 16px;">
                <tr>
                  <td>
                    <div style="font-size: 13px; font-weight: 700; color: #785408; margin-bottom: 3px; display: flex; align-items: center;">
                      ⏰ Team Review Protocol
                    </div>
                    <div style="font-size: 13px; color: #523B06; line-height: 1.45;">
                      <strong>&ldquo;Please review this application and contact the applicant within 48 hours of submission.&rdquo;</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Meta Strip (Reference & Time) -->
          <tr>
            <td style="padding: 16px 30px 0 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8FAFD; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px;">
                <tr>
                  <td style="font-size: 12px; color: #596579;">
                    <strong style="color: #0B1F3A;">Reference ID:</strong> <code style="background-color: #EAF1F9; color: #123B73; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-family: monospace;">${escapeHtml(app.referenceId)}</code>
                  </td>
                  <td align="right" style="font-size: 12px; color: #596579;">
                    <strong style="color: #0B1F3A;">Submitted:</strong> ${escapeHtml(app.timestamp)} IST
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Application Details Section -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #123B73; letter-spacing: 0.6px; margin: 0 0 12px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
                Applicant &amp; Venture Details
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: separate; border-spacing: 0;">
                <!-- Full Name -->
                <tr>
                  <td width="35%" style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Applicant Name:
                  </td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0B1F3A; font-weight: 700; border-bottom: 1px solid #F1F4F8;">
                    ${escapeHtml(app.name)}
                  </td>
                </tr>

                <!-- Incubation Track -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Incubation Track:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; color: #123B73; font-weight: 700; border-bottom: 1px solid #F1F4F8;">
                    <span style="background-color: #EAF1F9; color: #123B73; padding: 3px 8px; border-radius: 4px; font-size: 12px; border: 1px solid #C2D8F2;">
                      ${escapeHtml(app.track)}
                    </span>
                  </td>
                </tr>

                <!-- Email Address -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Email Address:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; border-bottom: 1px solid #F1F4F8;">
                    <a href="mailto:${escapeHtml(app.email)}" style="color: #123B73; text-decoration: none; font-weight: 600;">
                      ${escapeHtml(app.email)}
                    </a>
                  </td>
                </tr>

                <!-- Phone / WhatsApp -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Phone / WhatsApp:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; border-bottom: 1px solid #F1F4F8;">
                    <a href="tel:${escapeHtml(app.phone)}" style="color: #123B73; text-decoration: none; font-weight: 600;">
                      ${escapeHtml(app.phone)}
                    </a>
                  </td>
                </tr>

                <!-- Institution / Organization -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Institution / Org:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; color: #172334; border-bottom: 1px solid #F1F4F8;">
                    ${escapeHtml(app.organization || "N/A")}
                  </td>
                </tr>

                <!-- Technology Domain -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Technology Domain:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; color: #172334; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    ${escapeHtml(readableDomain)}
                  </td>
                </tr>

                <!-- Current Stage -->
                <tr>
                  <td style="padding: 8px 10px 8px 0; font-size: 13px; color: #596579; font-weight: 600; border-bottom: 1px solid #F1F4F8;">
                    Current Stage:
                  </td>
                  <td style="padding: 8px 0; font-size: 13px; color: #172334; border-bottom: 1px solid #F1F4F8;">
                    ${escapeHtml(app.stage || "Not specified")}
                  </td>
                </tr>
              </table>

              <!-- Project Overview Box -->
              <div style="margin-top: 18px;">
                <div style="font-size: 13px; font-weight: 700; color: #123B73; margin-bottom: 6px;">
                  Project / Innovation Overview:
                </div>
                <div style="background-color: #F8FAFD; border: 1px solid #DCE3EC; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #2B3A4E; line-height: 1.55; white-space: pre-wrap;">
                  ${escapeHtml(app.idea || "No brief description provided by the applicant.")}
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <div style="margin-top: 24px; text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                  <tr>
                    <td style="padding-right: 8px;">
                      <a href="mailto:${escapeHtml(app.email)}?subject=Re:%20NF%20Venture%20Studio%20Application%20%E2%80%94%20${encodeURIComponent(app.name)}" 
                         style="display: inline-block; background-color: #123B73; color: #FFFFFF; font-size: 12px; font-weight: 700; padding: 10px 18px; border-radius: 8px; text-decoration: none;">
                        ✉ Reply via Email
                      </a>
                    </td>
                    <td style="padding-right: 8px;">
                      <a href="tel:${escapeHtml(app.phone)}" 
                         style="display: inline-block; background-color: #FFFFFF; color: #123B73; font-size: 12px; font-weight: 700; padding: 9px 16px; border-radius: 8px; text-decoration: none; border: 1px solid #C2D8F2;">
                        📞 Call Applicant
                      </a>
                    </td>
                    ${app.spreadsheetUrl ? `
                    <td>
                      <a href="${escapeHtml(app.spreadsheetUrl)}" target="_blank" 
                         style="display: inline-block; background-color: #F8FAFD; color: #596579; font-size: 12px; font-weight: 600; padding: 9px 14px; border-radius: 8px; text-decoration: none; border: 1px solid #DCE3EC;">
                        📊 Open Google Sheet
                      </a>
                    </td>
                    ` : ""}
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer Strip -->
          <tr>
            <td style="background-color: #F8FAFD; padding: 18px 30px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #718096; line-height: 1.45;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #4A5568;">
                NF Venture Studio &middot; Naree Foundation Incubation Center
              </p>
              <p style="margin: 0;">
                Nigdi, Pune, Maharashtra &middot; Helpline: ${CONFIG.HELPLINE_PHONE} &middot; <a href="mailto:${CONFIG.NOTIFICATION_EMAIL}" style="color: #123B73; text-decoration: none;">${CONFIG.NOTIFICATION_EMAIL}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Send email using Google Apps Script's built-in MailApp
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: "NF Venture Studio Incubation Desk",
    replyTo: app.email || recipient
  });
}

// ============================================================================
// SECURITY & UTILITY HELPERS
// ============================================================================
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// TEST FUNCTION FOR SCRIPT EDITOR (Direct manual verification)
// ============================================================================
/**
 * Run this function inside the Apps Script editor to test Google Sheets appending
 * and immediate email delivery to ncfitcell@gmail.com without using the website.
 */
function testSendNotification() {
  Logger.log("Starting test application workflow...");
  
  const mockPayload = {
    name: "Test Applicant (Verification)",
    email: "test.innovator@example.com",
    phone: "+91 9876543210",
    organization: "Test Engineering College / University",
    track: "Student Startup Track",
    technology: "AI",
    stage: "Prototype",
    idea: "Verification test of the Google Sheets + Email notification system for NF Venture Studio."
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(mockPayload)
    }
  };

  const response = doPost(mockEvent);
  Logger.log("Test execution result: " + response.getContent());
}
