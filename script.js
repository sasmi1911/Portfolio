document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight the current active page in the navigation links
  const current = document.body.dataset.page;
  document.querySelectorAll(".links a").forEach((a) => {
    if (a.dataset.page === current) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // 2. Handle mobile menu toggle (open/close)
  const menu = document.querySelector(".menu");
  const links = document.querySelector(".links");
  
  if (menu && links) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  // 3. Dynamically set the current year in the footer
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 4. Filter projects/cards based on category
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project");

  filterButtons.forEach((b) => {
    b.addEventListener("click", () => {
      // Update active state on buttons
      filterButtons.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");

      // Show/hide cards matching the selected filter
      const filterValue = b.dataset.filter;
      cards.forEach((c) => {
        c.hidden = filterValue !== "all" && c.dataset.category !== filterValue;
      });
    });
  });

  // 5. Handle contact form submission (opens default email client)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const n = document.getElementById("name").value.trim();
      const mail = document.getElementById("email").value.trim();
      const msg = document.getElementById("message").value.trim();

      document.getElementById("formMessage").textContent = 
        "Opening your email app to prepare the message…";

      location.href = 
        "mailto:sasmi.1911@gmail.com?subject=" + 
        encodeURIComponent("Portfolio message from " + n) + 
        "&body=" + 
        encodeURIComponent("Name: " + n + "\nEmail: " + mail + "\n\n" + msg);
    });
  }
});