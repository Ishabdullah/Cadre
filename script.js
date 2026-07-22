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

// Simple form success message (inline)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const msg = document.createElement('p');
        msg.style.color = 'green';
        msg.textContent = 'Thank you for your submission!';
        // Remove any previous message
        const old = form.querySelector('p.success');
        if (old) old.remove();
        msg.className = 'success';
        form.appendChild(msg);
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