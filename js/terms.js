document.addEventListener("DOMContentLoaded", () => {
    // Expand/Collapse Sections
    const expandableHeaders = document.querySelectorAll(".expandable");
    expandableHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            content.classList.toggle("visible");
        });
    });

  
    // Highlight Current Section
    const sections = document.querySelectorAll(".section");
    const options = { threshold: 0.5 }; // Trigger when 50% of the section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("highlighted");
            } else {
          
                entry.target.classList.remove("highlighted");
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
});

