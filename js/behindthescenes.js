// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Toggle Code Blocks
    function toggleCode(id) {
        const codeBlock = document.getElementById(id);
        if (codeBlock.style.display === "block") {
            codeBlock.style.display = "none";
        } else {
            codeBlock.style.display = "block";
            scrollToElement(codeBlock); // Scroll into view when toggled
        }
    }

    // Highlight Active Section on Scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = null;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Adjust for header height
            if (window.scrollY > sectionTop) {
                current = section;
            }
        });

        // Add 'active' class to the visible section
        sections.forEach((section) => section.classList.remove('active'));
        if (current) {
            current.classList.add('active');
        }
    });

    // Modal for Enlarging Images
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('img');
    document.querySelectorAll('.gallery img, .section img').forEach((img) => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            modal.classList.add('active');
        });
    });

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Scroll to Section
    function scrollToElement(element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }

    // Add Section Navigation Buttons Dynamically
    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-buttons');
    sections.forEach((section, index) => {
        const button = document.createElement('button');
        button.classList.add('nav-button');
        button.innerText = `Go to ${section.querySelector('h2').innerText}`;
        button.addEventListener('click', () => scrollToElement(section));
        navContainer.appendChild(button);
    });
    document.body.appendChild(navContainer);

    // Easter Egg: Randomize Background Color on Double-Click
    document.body.addEventListener('dblclick', () => {
        const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
        document.body.style.backgroundColor = randomColor;
        console.log(`Background changed to: ${randomColor}`);
    });

    // Animated Text Reveal
    const animatedTextElements = document.querySelectorAll('.text');
    animatedTextElements.forEach((element) => {
        element.style.opacity = 0;
        element.style.transition = "opacity 1s ease-in-out";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
    });

    // Add Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.innerText = "Back to Top";
    backToTop.classList.add('back-to-top');
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "20px";
    backToTop.style.right = "20px";
    backToTop.style.padding = "10px";
    backToTop.style.borderRadius = "5px";
    backToTop.style.display = "none";
    backToTop.style.zIndex = "1000";
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(backToTop);

    // Show/Hide Back to Top Button on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });
});
