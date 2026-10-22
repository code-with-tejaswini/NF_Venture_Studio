# NF Venture Studio — Incubation Application Script & Email Notifications

This directory contains the production-ready Google Apps Script (`Code.gs`) that powers the incubation application submission workflow for **NF Venture Studio (Naree Foundation)**.

---

## 📌 Architecture Overview

1. **Website Front-end ([`NFApplicationForm.tsx`](../src/components/nf/NFApplicationForm.tsx)):**
   - Collects the applicant's name, email, phone/WhatsApp, organization, track, domain, stage, and idea.
   - Prevents duplicate submissions while in-flight.
   - Posts a JSON payload directly to the Google Apps Script Web App URL (`GOOGLE_SCRIPT_URL`).
2. **Google Apps Script (`Code.gs`):**
   - Validates required fields.
   - Saves a new row into the connected **Google Sheet**.
   - Generates a unique reference ID (e.g., `NFVS-20261016-4821`).
   - Dispatches a secure, HTML-escaped email notification to **`ncfitcell@gmail.com`**.
   - Records the delivery timestamp in a `Notification Status` column.
   - Returns a structured JSON response back to the website.
3. **Applicant Confirmation:**
   - Displays the official confirmation message:
     > *"Thank you for applying to NF Venture Studio. Your application has been received successfully. Our team aims to review your application and contact you within 48 hours."*

---

## 🚀 4-Step Deployment Guide for Spreadsheet Owner

Follow these quick steps to update your deployed Google Apps Script:

### Step 1: Open the Script Editor in Google Sheets
1. Open the **Google Sheets spreadsheet** where applications are currently stored.
2. In the top menu, click **Extensions** ➔ **Apps Script**.

### Step 2: Paste the Updated Code
1. Open `Code.gs` in the left file explorer of the Apps Script editor.
2. Replace all existing contents with the code from [`google-apps-script/Code.gs`](./Code.gs).
3. Click the **Save** icon (Ctrl + S / Cmd + S).

### Step 3: Run the Built-In Test & Authorize Permissions
1. At the top of the Apps Script editor, locate the function dropdown (next to "Run" and "Debug").
2. Select **`testSendNotification`**.
3. Click **Run**.
4. When prompted:
   - Click **Review permissions**.
   - Choose your Google account.
   - Click **Advanced** ➔ **Go to NF Venture Studio Script (unsafe)** *(standard Google warning for personal Apps Scripts)*.
   - Click **Allow** for Google Sheets and MailApp permissions.
5. In the Execution Log below, verify that it outputs:
   `{"success":true,"message":"Application submitted successfully", ...}`.
6. Check the inbox of **`ncfitcell@gmail.com`** to verify the test notification arrived.

### Step 4: Deploy as a Web App
1. In the top-right corner of the Apps Script editor, click **Deploy** ➔ **Manage deployments**.
2. Click the **Edit** (pencil) icon next to the active Web App deployment.
3. Under **Version**, select **New version**.
4. Ensure:
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **Deploy**.
6. If the deployment URL is identical to the existing URL (`AKfycbzf_pc_bme4a9INi5pPRtT8Ao9qKkYQfbz50_f37LGfmdg6O14bPkk3pMQ35iAt_zdbgA`), no front-end code change is needed! If Google generates a new URL, update `GOOGLE_SCRIPT_URL` in [`src/components/nf/NFApplicationForm.tsx`](../src/components/nf/NFApplicationForm.tsx).

---

## 🔒 Security & Reliability Guarantees

* **No Credentials Exposed:** Uses Google's native server-side `MailApp.sendEmail()`. No SMTP passwords or API keys are stored in client-side code.
* **Input Sanitization:** All user-provided fields are sanitized using `escapeHtml()` to prevent HTML/XSS injection in email clients.
* **Failure Isolation:** If email sending encounters a quota or network issue, the Google Sheet row record is **always preserved**, and the partial error is logged to the spreadsheet without dropping the application.
* **Zero Duplicates:** Front-end submission lock prevents rapid double-clicks and repeated requests.
