// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Contact form
    initContactForm();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navbar scroll effect
    // initNavbarScroll();
    
    // Theme toggle
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality with Web3Forms
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        button.disabled = true;
        
        // Remove any existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        try {
            // Add Web3Forms access key
            formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // This will be replaced with actual key
            formData.append('subject', 'New Contact Form Submission from Portfolio');
            formData.append('from_name', formData.get('name'));
            formData.append('redirect', window.location.href + '#contact');
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    });
}

// Show form message
function showFormMessage(message, type) {
    const form = document.getElementById('contact-form');
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the beginning of the form
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .highlight-item, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only apply scroll effects on desktop
        if (window.innerWidth > 768) {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.1)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.1)';
                navbar.style.boxShadow = 'none';
            }
        }
        // Mobile: no scroll effects to prevent layout issues
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link highlighting
updateActiveNavLink();

// Utility function to handle download resume
function downloadResume() {
    // This function will be triggered when the download resume button is clicked
    // The actual PDF file should be placed in the assets folder
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Ajeet_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add click tracking for resume download
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.querySelector('a[href="assets/resume.pdf"]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // Track download event (you can add analytics here)
            console.log('Resume download initiated');
        });
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    if (!name || name.length < 2) {
        throw new Error('Please enter a valid name (at least 2 characters)');
    }
    
    if (!email || !validateEmail(email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!subject || subject.length < 5) {
        throw new Error('Please enter a subject (at least 5 characters)');
    }
    
    if (!message || message.length < 10) {
        throw new Error('Please enter a message (at least 10 characters)');
    }
    
    return true;
}

// Enhanced contact form with validation
function initContactFormEnhanced() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
        });
    });
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            // Validate form before submission
            validateForm(formData);
            
            const button = form.querySelector('button[type="submit"]');
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            button.disabled = true;
            
            // Remove any existing messages
            const existingMessage = form.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Add Web3Forms configuration
            formData.append('access_key', ''); // Will be configured with actual key
            formData.append('subject', `Portfolio Contact: ${formData.get('subject')}`);
            formData.append('from_name', formData.get('name'));
            formData.append('reply_to', formData.get('email'));
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            showFormMessage(error.message || 'Please check your inputs and try again.', 'error');
        } finally {
            // Reset button state
            const button = form.querySelector('button[type="submit"]');
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');
            
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.type) {
        case 'email':
            if (value && !validateEmail(value)) {
                field.classList.add('error');
                return false;
            }
            break;
        case 'text':
            if (field.required && value.length < 2) {
                field.classList.add('error');
                return false;
            }
            break;
        case 'textarea':
            if (field.required && value.length < 10) {
                field.classList.add('error');
                return false;
            }
            break;
    }
    
    field.classList.remove('error');
    return true;
}

// Initialize enhanced form validation
// initContactFormEnhanced();

// Lazy loading for performance
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    element.src = src;
                    element.removeAttribute('data-lazy');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme toggle icon
    updateThemeIcon(theme);
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Social Media Link Tracking
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList[1]; // Gets the platform class (linkedin, instagram, etc.)
            console.log(`Social media click: ${platform}`);
            
            // You can add analytics tracking here
            // gtag('event', 'social_click', { platform: platform });
        });
    });
}

// Photo Upload Functionality (for future implementation)
function initPhotoUpload() {
    const photoContainer = document.querySelector('.profile-photo');
    
    if (!photoContainer) return;
    
    // Add click event for future photo upload functionality
    photoContainer.addEventListener('click', function() {
        console.log('Photo upload functionality can be added here');
        // This is where you would implement photo upload in the future
    });
}

// Enhanced Form Validation with Visual Feedback
function addFormFieldValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateFieldWithFeedback(this);
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            this.classList.remove('error', 'success');
            clearFieldMessage(this);
        });
    });
}

function validateFieldWithFeedback(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (field.type) {
        case 'email':
            if (value && !validateEmail(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'text':
            if (field.required && value.length < 2) {
                isValid = false;
                message = 'This field must be at least 2 characters';
            }
            break;
        default:
            if (field.tagName === 'TEXTAREA' && field.required && value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters';
            }
    }
    
    if (value) {
        field.classList.add(isValid ? 'success' : 'error');
        if (!isValid) {
            showFieldMessage(field, message);
        }
    }
    
    return isValid;
}

function showFieldMessage(field, message) {
    clearFieldMessage(field);
    
    const messageEl = document.createElement('span');
    messageEl.className = 'field-message';
    messageEl.textContent = message;
    
    field.parentElement.appendChild(messageEl);
}

function clearFieldMessage(field) {
    const existingMessage = field.parentElement.querySelector('.field-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSocialTracking();
    initPhotoUpload();
    addFormFieldValidation();
});

// Initialize performance tracking
trackPerformance();
