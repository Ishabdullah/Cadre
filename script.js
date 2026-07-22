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

// ============================================
// SUBCONTRACTOR ONBOARDING MODAL LOGIC
// ============================================
const subcontractorModal = document.getElementById('subcontractorModal');
const agreementModal = document.getElementById('agreementModal');
const subcontractorForm = document.getElementById('subcontractorForm');

// Open modal helpers
function openModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    // Focus first focusable element
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
    // Trap focus
    modal.addEventListener('keydown', trapFocus);
}

function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', trapFocus);
}

function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const modal = e.currentTarget;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

// Open subcontractor modal from hero CTA
const openSubcontractorModalHero = document.getElementById('openSubcontractorModalHero');
if (openSubcontractorModalHero) {
    openSubcontractorModalHero.addEventListener('click', () => openModal(subcontractorModal));
}

// Open subcontractor modal from trade partners section
const openSubcontractorModal = document.getElementById('openSubcontractorModal');
if (openSubcontractorModal) {
    openSubcontractorModal.addEventListener('click', () => openModal(subcontractorModal));
}

// Close modals via close buttons
document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        closeModal(modal);
    });
});

// Close modal on overlay click (outside container)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!subcontractorModal.hidden) closeModal(subcontractorModal);
        if (!agreementModal.hidden) closeModal(agreementModal);
    }
});

// Open agreement terms modal
const reviewAgreementBtn = document.getElementById('reviewAgreementBtn');
if (reviewAgreementBtn) {
    reviewAgreementBtn.addEventListener('click', () => openModal(agreementModal));
}

// Close agreement modal
const closeAgreementBtn = document.getElementById('closeAgreementBtn');
if (closeAgreementBtn) {
    closeAgreementBtn.addEventListener('click', () => closeModal(agreementModal));
}

// Download agreement placeholder
const downloadAgreementBtn = document.getElementById('downloadAgreementBtn');
if (downloadAgreementBtn) {
    downloadAgreementBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Agreement template download coming soon. Please contact cadre.projectmanager@gmail.com for a copy.');
    });
}

// Conditional license number field
const licenseRadios = document.querySelectorAll('input[name="has_license"]');
const licenseNumberField = document.getElementById('license_number_field');
const licenseNumberInput = document.getElementById('license_number');
licenseRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Yes') {
            licenseNumberField.hidden = false;
            licenseNumberInput.required = true;
            licenseNumberInput.setAttribute('aria-required', 'true');
        } else {
            licenseNumberField.hidden = true;
            licenseNumberInput.required = false;
            licenseNumberInput.removeAttribute('aria-required');
        }
    });
});

// File input validation (max 5MB)
const fileInputs = document.querySelectorAll('#coi_upload, #license_upload');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
fileInputs.forEach(input => {
    input.addEventListener('change', () => {
        const file = input.files[0];
        if (file && file.size > MAX_FILE_SIZE) {
            alert(`File "${file.name}" exceeds 5MB limit. Please select a smaller file.`);
            input.value = '';
        }
    });
});

// Subcontractor form submission
if (subcontractorForm) {
    subcontractorForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitSubcontractorBtn');
        const originalBtnText = submitBtn.textContent;

        // Remove any previous messages
        const oldMsg = subcontractorForm.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        // Client-side validation
        const requiredFields = subcontractorForm.querySelectorAll('[required]');
        let firstInvalid = null;
        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                field.reportValidity();
                if (!firstInvalid) firstInvalid = field;
            }
        });
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        // Validate file inputs have files
        const coiFile = document.getElementById('coi_upload').files[0];
        const licenseFile = document.getElementById('license_upload').files[0];
        if (!coiFile || !licenseFile) {
            alert('Please upload both Certificate of Insurance and License Verification documents.');
            return;
        }

        // Set subject line with business name
        const businessName = document.getElementById('business_name').value.trim() || 'Unknown Company';
        const subjectInput = subcontractorForm.querySelector('input[name="_subject"]');
        if (subjectInput) subjectInput.value = `New Subcontractor Application - ${businessName}`;

        // Set button to loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(subcontractorForm);
            const response = await fetch('https://formspree.io/f/cadre.projectmanager@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success message
                const msg = document.createElement('div');
                msg.className = 'form-message success';
                msg.innerHTML = '<strong>Application Received!</strong> Our project management team will review your qualifications and contact you within 24-48 hours.';
                subcontractorForm.appendChild(msg);
                subcontractorForm.reset();
                licenseNumberField.hidden = true;
                licenseNumberInput.required = false;

                // Scroll to message
                msg.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Auto-close modal after 3 seconds
                setTimeout(() => closeModal(subcontractorModal), 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message with fallback email
            const msg = document.createElement('div');
            msg.className = 'form-message error';
            msg.innerHTML = 'Sorry, there was an error submitting your application. Please email us directly at <a href="mailto:cadre.projectmanager@gmail.com">cadre.projectmanager@gmail.com</a> with your details.';
            subcontractorForm.appendChild(msg);
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Contact form submission (existing)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        const oldMsg = contactForm.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://formspree.io/f/cadre.projectmanager@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const msg = document.createElement('p');
                msg.className = 'form-message success';
                msg.textContent = 'Thank you! Your message has been sent to Cadre & Consilium Group. We will review your inquiry and respond shortly.';
                contactForm.appendChild(msg);
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            const msg = document.createElement('p');
            msg.className = 'form-message error';
            msg.innerHTML = 'Sorry, there was an error sending your message. Please email us directly at <a href="mailto:cadre.projectmanager@gmail.com">cadre.projectmanager@gmail.com</a>.';
            contactForm.appendChild(msg);
        } finally {
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