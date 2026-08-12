# Google Sheets (Excel) Live Job Feed Setup Guide for GIndia HR

Follow this step-by-step process to connect your Google Sheet (Excel file) to the website so that job openings update automatically without modifying HTML code.

---

## Step 1: Create a Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a **New Blank Spreadsheet**.
2. Name the spreadsheet: `GIndiaHR Live Job Postings`.
3. In the **first row (Header Row)**, add the exact column names below:

| job_title | company | location | experience | salary | category | skills | seo_keywords | is_recommended | display_priority | is_active |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Senior AI Engineer | Tech Corp | Noida / Remote | 3-5 Yrs | 15-20 LPA | IT & Software | Python, LLMs, PyTorch | AI Jobs Noida, Python Engineer | YES | 1 | YES |
| HR Manager | GIndiaHR | Delhi | 2-4 Yrs | 5-7 LPA | HR & Recruitment | Sourcing, Screening | HR Recruiter Jobs Delhi | YES | 2 | YES |
| Accountant | Finance Hub | Patna | 1-3 Yrs | 3-4 LPA | Non-IT & Corporate | Tally, GST | Accountant Jobs Patna | NO | 3 | YES |

---

## Step 2: Explanation of Columns

- `job_title`: Designation / Role name.
- `company`: Client or hiring company name.
- `location`: City or region (e.g., Delhi, Patna, Remote).
- `experience`: Required work experience.
- `salary`: Offered package range.
- `category`: Category name (`IT & Software`, `HR & Recruitment`, `Non-IT & Corporate`).
- `skills`: Comma-separated key skills (e.g. `Python, React, Machine Learning`).
- `seo_keywords`: Keywords for SEO targeting.
- `is_recommended`: Set to **YES** if you want this job highlighted with a "Recommended Job" badge and placed at the top. Set to **NO** for standard jobs.
- `display_priority`: Number order (1 = highest top position, 2 = second, etc.).
- `is_active`: Set to **YES** to show on website. Set to **NO** to hide filled/expired jobs.

---

## Step 3: Publish Google Sheet to Web (CSV Format)

1. Click on **File** in the top menu of Google Sheets.
2. Select **Share** -> **Publish to web**.
3. Under **Link**, choose:
   - Select: `Entire Document` (or Sheet 1)
   - Change `Web page` to **`Comma-separated values (.csv)`**
4. Click **Publish**.
5. Copy the generated URL link (it will end with `...output=csv`).

---

## Step 4: Link to Website

Open `index.html` (or any job listing page) and set the global variable before `js/jobs-feed.js`:

```html
<script>
  window.GOOGLE_SHEETS_CSV_URL = "YOUR_COPIED_GOOGLE_SHEET_CSV_URL_HERE";
</script>
<script src="js/jobs-feed.js"></script>
```

Whenever you add, edit, or set `is_active = NO` in your Google Sheet, the website updates automatically in real-time!
