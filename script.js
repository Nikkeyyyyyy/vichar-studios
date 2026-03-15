/**
 * script.js - Interactive UI Elements
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. STICKY NAVBAR & SMOOTH SCROLL --- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    /* --- 2. SCROLL REVEAL (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If the element has numbers to count, trigger them
                if (entry.target.classList.contains('stats-container')) {
                    startNumberCounters();
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 3. ANIMATED NUMBER COUNTERS --- */
    let countersStarted = false;

    function startNumberCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Total duration in ms (lower is faster)

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Adjust increment based on target size
                const inc = target / speed;

                if (count < target) {
                    // Update and format nicely
                    if (target % 1 !== 0) { // If it's a decimal number like 3.2
                        counter.innerText = (count + inc).toFixed(1);
                    } else {
                        counter.innerText = Math.ceil(count + inc);
                    }
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target; // Ensure exact finish line
                }
            };

            updateCount();
        });
    }


    /* --- 4. 3D MAGNETIC HOVER (Services Cards) --- */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Get bounding client rect
            const rect = card.getBoundingClientRect();

            // Calculate mouse position relative to card center
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            // Apply transformation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease'; // Quick follow

            // Update CSS variables for the background glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease'; // Smooth return
        });
    });

    /* --- 5. AJAX FORM SUBMISSION --- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent the default page redirect

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;

            // Show loading state
            submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Hide the form completely and show a thank you message
                    contactForm.style.display = 'none';
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you for reaching out to us! We has received your message and will be in touch shortly.';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data.errors.map(error => error.message).join(", "));
                    } else {
                        throw new Error("Oops! There was a problem submitting your form");
                    }
                }
            } catch (error) {
                // Show error message but keep form visible
                formStatus.style.display = 'block';
                formStatus.style.color = '#EF4444'; // Red color for errors
                formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${error.message || "Oops! There was a problem submitting your form"}`;

                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});
