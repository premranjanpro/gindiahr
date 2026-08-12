/**
 * Animated Workflow Trigger Script for HR Hiring & IT Software SDLC Pipelines
 */
document.addEventListener("DOMContentLoaded", () => {
  // Interactive Vertical Switcher
  const hrTabBtn = document.getElementById("tab-hr-division");
  const itTabBtn = document.getElementById("tab-it-division");
  const hrSection = document.getElementById("hr-division-content");
  const itSection = document.getElementById("it-division-content");

  if (hrTabBtn && itTabBtn && hrSection && itSection) {
    hrTabBtn.addEventListener("click", () => {
      hrTabBtn.classList.add("active-hr");
      hrTabBtn.classList.remove("btn-default");
      itTabBtn.classList.remove("active-it");
      itTabBtn.classList.add("btn-default");

      hrSection.style.display = "block";
      itSection.style.display = "none";
    });

    itTabBtn.addEventListener("click", () => {
      itTabBtn.classList.add("active-it");
      itTabBtn.classList.remove("btn-default");
      hrTabBtn.classList.remove("active-hr");
      hrTabBtn.classList.add("btn-default");

      itSection.style.display = "block";
      hrSection.style.display = "none";
    });
  }

  // Interactive Pipeline Animation (Active Node Highlight on Hover)
  const steps = document.querySelectorAll(".pipeline-step-card");
  steps.forEach((step, idx) => {
    step.addEventListener("mouseenter", () => {
      steps.forEach(s => s.classList.remove("pulse-node"));
      step.classList.add("pulse-node");
    });
  });
});
