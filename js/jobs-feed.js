/**
 * GIndiaHR Google Sheets Dynamic Job Feed Engine
 * Pulls active job listings from Google Sheets (CSV) and renders them with filtering & sorting.
 */

// Default Fallback Jobs dataset if CSV link is not configured yet
const DEFAULT_JOBS_DATA = [
  {
    job_title: "Senior AI / ML Software Engineer",
    company: "TechNova Solutions",
    location: "Noida / Remote",
    experience: "3 - 6 Years",
    salary: "₹12,000,00 - ₹22,000,00 P.A.",
    category: "IT & Software",
    skills: "Python, PyTorch, LLMs, REST APIs, Docker",
    seo_keywords: "AI Software Engineer Noida, Python AI jobs, Machine Learning Developer",
    is_recommended: "YES",
    display_priority: "1",
    is_active: "YES"
  },
  {
    job_title: "HR Talent Acquisition Specialist",
    company: "Global India HR Solutions",
    location: "Delhi NCR / Patna",
    experience: "2 - 5 Years",
    salary: "₹4,50,000 - ₹7,50,000 P.A.",
    category: "HR & Recruitment",
    skills: "Resume Screening, Sourcing, Technical Hiring, Interview Scheduling",
    seo_keywords: "HR recruiter jobs Delhi, Talent Acquisition HR manager",
    is_recommended: "YES",
    display_priority: "2",
    is_active: "YES"
  },
  {
    job_title: "Full Stack Web Developer (React + Node)",
    company: "Apex Infotech",
    location: "Gurugram / Hybrid",
    experience: "2 - 4 Years",
    salary: "₹8,00,000 - ₹14,00,000 P.A.",
    category: "IT & Software",
    skills: "JavaScript, React, Node.js, MongoDB, Tailwind CSS",
    seo_keywords: "Fullstack Developer Gurugram, React Developer Jobs",
    is_recommended: "YES",
    display_priority: "3",
    is_active: "YES"
  },
  {
    job_title: "BFSI Assistant Branch Manager",
    company: "Leading National Private Bank",
    location: "Patna / Ranchi / Lucknow",
    experience: "4 - 8 Years",
    salary: "₹6,00,000 - ₹9,50,000 P.A.",
    category: "Non-IT & Corporate",
    skills: "Retail Banking, Client Relationship, Financial Sales, Loan Audit",
    seo_keywords: "BFSI Banking Jobs Patna, Bank Manager openings",
    is_recommended: "NO",
    display_priority: "4",
    is_active: "YES"
  }
];

class JobFeedManager {
  constructor(csvUrl = null, containerId = "jobs-container") {
    this.csvUrl = csvUrl;
    this.containerId = containerId;
    this.jobs = [];
  }

  async init() {
    if (this.csvUrl) {
      try {
        const response = await fetch(this.csvUrl);
        const csvText = await response.text();
        this.jobs = this.parseCSV(csvText);
      } catch (err) {
        console.warn("Could not load Google Sheet CSV, falling back to default data:", err);
        this.jobs = DEFAULT_JOBS_DATA;
      }
    } else {
      this.jobs = DEFAULT_JOBS_DATA;
    }

    this.render();
  }

  parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) return DEFAULT_JOBS_DATA;

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/ /g, '_').replace(/"/g, ''));
    const results = [];

    for (let i = 1; i < lines.length; i++) {
      // Regex handling for quoted CSV fields
      const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
      if (values.length < headers.length) continue;

      let row = {};
      headers.forEach((header, index) => {
        let val = values[index] ? values[index].replace(/^"|"$/g, '').trim() : '';
        row[header] = val;
      });
      results.push(row);
    }
    return results;
  }

  render(filterCategory = 'ALL') {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Active Jobs Filter & Sorting (Priority: Recommended -> Priority order)
    let filteredJobs = this.jobs.filter(j => (j.is_active || 'YES').toUpperCase() === 'YES');

    if (filterCategory !== 'ALL') {
      filteredJobs = filteredJobs.filter(j => (j.category || '').toUpperCase().includes(filterCategory.toUpperCase()));
    }

    filteredJobs.sort((a, b) => {
      const recA = (a.is_recommended || '').toUpperCase() === 'YES' ? 1 : 0;
      const recB = (b.is_recommended || '').toUpperCase() === 'YES' ? 1 : 0;
      if (recB !== recA) return recB - recA;

      const prioA = parseInt(a.display_priority || 99, 10);
      const prioB = parseInt(b.display_priority || 99, 10);
      return prioA - prioB;
    });

    if (filteredJobs.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <p class="text-muted">No open positions found under this category right now. Check back soon or <a href="post-resume.html">post your resume</a>!</p>
        </div>
      `;
      return;
    }

    let html = '<div class="row">';
    filteredJobs.forEach(job => {
      const isRecommended = (job.is_recommended || '').toUpperCase() === 'YES';
      const skillsArray = (job.skills || '').split(',').map(s => s.trim()).filter(Boolean);

      html += `
        <div class="col-md-6 col-sm-12">
          <div class="job-card ${isRecommended ? 'recommended-job' : ''}">
            ${isRecommended ? '<span class="badge-recommended"><i class="fa fa-star"></i> Recommended Job</span>' : ''}
            <h3 class="job-title">${this.escapeHTML(job.job_title || 'Position Open')}</h3>
            <div class="job-company"><i class="fa fa-building-o"></i> ${this.escapeHTML(job.company || 'GIndiaHR Partner Client')}</div>
            
            <div class="job-meta-list">
              <span><i class="fa fa-map-marker"></i> ${this.escapeHTML(job.location || 'Pan India')}</span>
              <span><i class="fa fa-briefcase"></i> ${this.escapeHTML(job.experience || 'Freshers / Experienced')}</span>
              <span><i class="fa fa-inr"></i> ${this.escapeHTML(job.salary || 'Best in Industry')}</span>
            </div>

            <div class="job-skills-tags">
              ${skillsArray.map(skill => `<span class="skill-tag">${this.escapeHTML(skill)}</span>`).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
              <small class="text-muted"><i class="fa fa-tag"></i> ${this.escapeHTML(job.category || 'General')}</small>
              <a href="contact-us.html?job=${encodeURIComponent(job.job_title)}" class="btn-apply-job">Apply Now <i class="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  // If user provided Google Sheet published CSV URL, pass here, else default
  const jobFeed = new JobFeedManager(window.GOOGLE_SHEETS_CSV_URL || null, "jobs-container");
  jobFeed.init();
  window.GIndiaJobFeed = jobFeed;
});
