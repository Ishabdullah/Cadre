// Cadre & Consilium Group, LLC - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    const MAILTO_EMAIL = 'cadre.projectmanager@gmail.com';

    function buildMailtoUrl(subject, body) {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        return `mailto:${MAILTO_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    function showMailtoSuccess(form, message, mailtoUrl) {
        const oldMsg = form.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message success';
        msg.innerHTML = `
            <strong>${message}</strong>
            <p class="mailto-instruction">Opening your email app... Please review the pre-filled message and tap Send!</p>
            <p class="mailto-fallback">
                Didn't open? <a href="${mailtoUrl}" target="_blank" rel="noopener">Click here to send email directly</a>
                or contact us at <a href="mailto:${MAILTO_EMAIL}">${MAILTO_EMAIL}</a>
            </p>
        `;
        form.appendChild(msg);
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return msg;
    }

    function showFormError(form, message) {
        const oldMsg = form.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message error';
        msg.innerHTML = message;
        form.appendChild(msg);
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function validateRequiredFields(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let firstInvalid = null;
        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                field.reportValidity();
                if (!firstInvalid) firstInvalid = field;
            }
        });
        return firstInvalid;
    }

    function getFormValue(form, fieldConfigs) {
        for (const config of fieldConfigs) {
            const field = form.querySelector(config.selector);
            if (field && field.value.trim()) {
                return field.value.trim();
            }
        }
        return config?.default || '';
    }

    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        });

        // Close mobile menu when clicking a nav link
        navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation');
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // MODAL HELPERS
    // ==========================================
    function openModal(modal) {
        if (!modal) return;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
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

    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay:not([hidden])').forEach(modal => closeModal(modal));
        }
    });

    // ==========================================
    // SUBCONTRACTOR ONBOARDING MODAL
    // ==========================================
    const subcontractorModal = document.getElementById('subcontractorModal');
    const agreementModal = document.getElementById('agreementModal');
    const subcontractorForm = document.getElementById('subcontractorForm');

    // Open subcontractor modal from hero CTA
    const openSubcontractorModalHero = document.getElementById('openSubcontractorModalHero');
    if (openSubcontractorModalHero && subcontractorModal) {
        openSubcontractorModalHero.addEventListener('click', () => openModal(subcontractorModal));
    }

    // Open subcontractor modal from trade partners section
    const openSubcontractorModal = document.getElementById('openSubcontractorModal');
    if (openSubcontractorModal && subcontractorModal) {
        openSubcontractorModal.addEventListener('click', () => openModal(subcontractorModal));
    }

    // Close modals via close buttons
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Open agreement terms modal
    const reviewAgreementBtn = document.getElementById('reviewAgreementBtn');
    if (reviewAgreementBtn && agreementModal) {
        reviewAgreementBtn.addEventListener('click', () => openModal(agreementModal));
    }

    // Close agreement modal
    const closeAgreementBtn = document.getElementById('closeAgreementBtn');
    if (closeAgreementBtn && agreementModal) {
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

    // Subcontractor form submission (mailto handler)
    if (subcontractorForm) {
        subcontractorForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitSubcontractorBtn');
            const originalBtnText = submitBtn?.textContent || 'Submit Application';

            // Client-side validation
            const invalidField = validateRequiredFields(this);
            if (invalidField) {
                invalidField.focus();
                return;
            }

            // Extract form data
            const businessName = getFormValue(this, [
                { selector: '#business_name' },
                { selector: '[name="business_name"]' }
            ]) || 'Unknown Company';

            const tradeSpecialty = getFormValue(this, [
                { selector: '#trade_specialty' },
                { selector: '[name="trade_specialty"]' }
            ]) || 'Not specified';

            const principalName = getFormValue(this, [
                { selector: '#principal_name' },
                { selector: '[name="principal_name"]' }
            ]) || 'Not provided';

            const phone = getFormValue(this, [
                { selector: '#sc_phone' },
                { selector: '[name="sc_phone"]' }
            ]) || 'Not provided';

            const email = getFormValue(this, [
                { selector: '#sc_email' },
                { selector: '[name="sc_email"]' }
            ]) || 'Not provided';

            const hasLicense = getFormValue(this, [
                { selector: 'input[name="has_license"]:checked' },
                { selector: '[name="has_license"]:checked' }
            ]) || 'Not specified';

            const licenseNumber = getFormValue(this, [
                { selector: '#license_number' },
                { selector: '[name="license_number"]' }
            ]);

            const hasGLInsurance = getFormValue(this, [
                { selector: 'input[name="has_gl_insurance"]:checked' },
                { selector: '[name="has_gl_insurance"]:checked' }
            ]) || 'Not specified';

            const hasWCInsurance = getFormValue(this, [
                { selector: 'input[name="has_wc_insurance"]:checked' },
                { selector: '[name="has_wc_insurance"]:checked' }
            ]) || 'Not specified';

            const hasCrewTools = getFormValue(this, [
                { selector: 'input[name="has_crew_tools"]:checked' },
                { selector: '[name="has_crew_tools"]:checked' }
            ]) || 'Not specified';

            const crewSize = getFormValue(this, [
                { selector: '#crew_size' },
                { selector: '[name="crew_size"]' }
            ]) || 'Not specified';

            const weeklyCapacity = getFormValue(this, [
                { selector: '#weekly_capacity' },
                { selector: '[name="weekly_capacity"]' }
            ]) || 'Not specified';

            const references = getFormValue(this, [
                { selector: '#references' },
                { selector: '[name="references"]' }
            ]) || 'Not provided';

            const agreeTerms = this.querySelector('#agree_terms, [name="agree_terms"]')?.checked ? 'Yes' : 'No';

            // Build email body with attachment checklist
            const subject = `New Subcontractor Application - ${businessName}`;
            const body = `--- REQUIRED ATTACHMENTS CHECKLIST ---
Please attach the following files to this email before sending:
[ ] Copy of CT HIC / Trade License
[ ] Certificate of Insurance (COI)
[ ] W-9 Form

--- APPLICANT DETAILS ---
Company Name: ${businessName}
Contact Name: ${principalName}
Phone: ${phone}
Email: ${email}
Trade Specialty: ${tradeSpecialty}
License #: ${licenseNumber || 'Not provided'}
Insurance Provider & Policy #: ${hasGLInsurance === 'Yes' ? 'Provided - see attached COI' : 'Not specified'}

Compliance & Verification:
--------------------------
Active CT HIC/Trade License: ${hasLicense}
$1M General Liability Insurance: ${hasGLInsurance}
Workers' Comp / Statutory Waiver: ${hasWCInsurance}
Own Crew, Tools & Transportation: ${hasCrewTools}

Operational Capacity:
---------------------
Active Crew Members: ${crewSize}
Weekly Availability (Hartford County): ${weeklyCapacity}

References / Recent Projects:
-----------------------------
${references}

Agreement Acceptance:
---------------------
Subcontractor MSA Terms Accepted: ${agreeTerms}

---
Sent from Cadre & Consilium Group Website
${new Date().toLocaleString()}
`;

            // Build mailto URL
            const mailtoUrl = buildMailtoUrl(subject, body);

            // Set button to loading state
            if (submitBtn) {
                submitBtn.textContent = 'Opening Email App...';
                submitBtn.disabled = true;
            }

            // Open mailto
            window.location.href = mailtoUrl;

            // Show success UI
            setTimeout(() => {
                showMailtoSuccess(this, 'Application Ready to Send! Don\'t forget to attach your COI and License documents to the email before tapping Send.', mailtoUrl);
                // Reset form
                this.reset();
                licenseNumberField.hidden = true;
                licenseNumberInput.required = false;
                licenseNumberInput.removeAttribute('aria-required');

                // Restore button
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 500);
        });
    }

    // ==========================================
    // PRE-CLAIM ESTIMATE MODAL
    // ==========================================
    const preClaimModal = document.getElementById('preClaimModal');
    const openPreClaimModal = document.getElementById('openPreClaimModal');
    const preClaimForm = document.getElementById('preClaimForm');

    // Open pre-claim modal from service card CTA
    if (openPreClaimModal && preClaimModal) {
        openPreClaimModal.addEventListener('click', () => openModal(preClaimModal));
    }

    // Pre-Claim form submission (mailto handler)
    if (preClaimForm) {
        preClaimForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitPreClaimBtn');
            const originalBtnText = submitBtn?.textContent || 'Request Free Estimate';

            // Client-side validation
            const invalidField = validateRequiredFields(this);
            if (invalidField) {
                invalidField.focus();
                return;
            }

            // Extract form data
            const fullName = getFormValue(this, [
                { selector: '#preClaimName' },
                { selector: '[name="full_name"]' }
            ]) || 'Not provided';

            const phone = getFormValue(this, [
                { selector: '#preClaimPhone' },
                { selector: '[name="phone"]' }
            ]) || 'Not provided';

            const email = getFormValue(this, [
                { selector: '#preClaimEmail' },
                { selector: '[name="email"]' }
            ]) || 'Not provided';

            const cityTown = getFormValue(this, [
                { selector: '#preClaimCity' },
                { selector: '[name="city_town"]' }
            ]) || 'Not provided';

            const damageType = getFormValue(this, [
                { selector: '#preClaimDamageType' },
                { selector: '[name="damage_type"]' }
            ]) || 'Not specified';

            const description = getFormValue(this, [
                { selector: '#preClaimDescription' },
                { selector: '[name="description"]' }
            ]) || 'No description provided';

            // Build email body
            const subject = `Free Pre-Claim Estimate Request - ${fullName}`;
            const body = `Free Pre-Claim Construction & Repair Estimate Request

Contact Details:
----------------
Name: ${fullName}
Phone: ${phone}
Email: ${email}
Property City/Town: ${cityTown}

Damage Details:
---------------
Type of Damage: ${damageType}
Description: ${description}

---
Sent from Cadre & Consilium Group Website
${new Date().toLocaleString()}
`;

            // Build mailto URL
            const mailtoUrl = buildMailtoUrl(subject, body);

            // Set button to loading state
            if (submitBtn) {
                submitBtn.textContent = 'Opening Email App...';
                submitBtn.disabled = true;
            }

            // Open mailto
            window.location.href = mailtoUrl;

            // Show success UI
            setTimeout(() => {
                showMailtoSuccess(this, 'Request Ready to Send! Your email app will open with a pre-filled message. Please review and tap Send.', mailtoUrl);
                this.reset();

                // Restore button
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 500);
        });
    }

    // ==========================================
    // CONTACT FORM (handles both homeowner & subcontractor)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn?.textContent || 'Submit';

            // Client-side validation
            const invalidField = validateRequiredFields(this);
            if (invalidField) {
                invalidField.focus();
                return;
            }

            // Extract form data - supports both field naming conventions
            const inquiryType = getFormValue(this, [
                { selector: '#inquiry_type' },
                { selector: '[name="inquiry_type"]' }
            ]) || 'homeowner';

            const fullName = getFormValue(this, [
                { selector: '#full_name' },
                { selector: '#name' },
                { selector: '[name="full_name"]' },
                { selector: '[name="name"]' }
            ]) || 'Not provided';

            const phone = getFormValue(this, [
                { selector: '#phone' },
                { selector: '[name="phone"]' }
            ]) || 'Not provided';

            const email = getFormValue(this, [
                { selector: '#email' },
                { selector: '[name="email"]' }
            ]) || 'Not provided';

            const cityTown = getFormValue(this, [
                { selector: '#city_town' },
                { selector: '#city' },
                { selector: '[name="city_town"]' },
                { selector: '[name="city"]' }
            ]) || 'Not provided';

            const message = getFormValue(this, [
                { selector: '#message' },
                { selector: '[name="message"]' }
            ]) || 'No message provided';

            // Build email body
            const subject = `New Website Inquiry - ${fullName} (${inquiryType === 'subcontractor' ? 'Subcontractor' : 'Homeowner'})`;
            const body = `New Website Inquiry Received

Inquiry Type: ${inquiryType === 'subcontractor' ? 'Subcontractor Application' : 'Homeowner Estimate Request'}

Contact Details:
----------------
Name: ${fullName}
Phone: ${phone}
Email: ${email}
City/Town: ${cityTown}

Message:
--------
${message}

---
Sent from Cadre & Consilium Group Website
${new Date().toLocaleString()}
`;

            // Build mailto URL
            const mailtoUrl = buildMailtoUrl(subject, body);

            // Set button to loading state
            if (submitBtn) {
                submitBtn.textContent = 'Opening Email App...';
                submitBtn.disabled = true;
            }

            // Open mailto
            window.location.href = mailtoUrl;

            // Show success UI
            setTimeout(() => {
                showMailtoSuccess(this, 'Message Ready to Send!', mailtoUrl);
                this.reset();

                // Restore button
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 500);
        });
    }

    // ==========================================
    // FOOTER YEAR
    // ==========================================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});