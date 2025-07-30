document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the href value (e.g., #hero)
            const targetElement = document.querySelector(targetId); // Find the target element

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: Close the mobile menu after clicking a link
                // This targets the hidden checkbox used for the hamburger menu
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle && menuToggle.checked) {
                    menuToggle.checked = false; // Uncheck the toggle to close the menu
                }
            }
        });
    });

    // --- Add an 'active' class to navbar links on scroll ---
    // This highlights the current section in the navigation
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const navLinks = document.querySelectorAll('.nav-links a'); // Get all navigation links

    const highlightNavOnScroll = () => {
        let currentSectionId = ''; // Variable to store the ID of the current section

        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Top position of the section relative to the document
            const sectionHeight = section.clientHeight; // Height of the section

            // Determine if the current scroll position is within this section
            // We use sectionHeight / 3 to make the active state switch a bit earlier
            // as the section comes into view, rather than when it's perfectly at the top.
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Remove 'active' class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add 'active' class to the link corresponding to the current section
        const activeLink = document.querySelector(`.nav-links a[href*="${currentSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // Listen for scroll events to update the active navigation link
    window.addEventListener('scroll', highlightNavOnScroll);
    // Call it once on load to set the initial active link (e.g., if starting not at top)
    highlightNavOnScroll();
});