// Cadre & Consilium Group, LLC - Main JavaScript

// Populate current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission with Formspree endpoint
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Remove any previous messages
        const oldMsg = form.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        // Set button to loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://formspree.io/f/cadre.projectmanager@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success message
                const msg = document.createElement('p');
                msg.className = 'form-message success';
                msg.textContent = 'Thank you! Your message has been sent to Cadre & Consilium Group. We will review your inquiry and respond shortly.';
                form.appendChild(msg);
                form.reset();
            } else {
                // Error from Formspree
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message with fallback email
            const msg = document.createElement('p');
            msg.className = 'form-message error';
            msg.innerHTML = 'Sorry, there was an error sending your message. Please email us directly at <a href="mailto:cadre.projectmanager@gmail.com">cadre.projectmanager@gmail.com</a>.';
            form.appendChild(msg);
        } finally {
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Mobile menu close on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    });
});