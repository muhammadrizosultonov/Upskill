// ============================================
// EDUCATION MANAGEMENT SYSTEM - MAIN JS
// Professional Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeParticles();
    initializeSidebar();
    initializeModals();
    initializeAnimations();
    initializeCharts();
});

// ============================================
// APP INITIALIZATION
// ============================================

function initializeApp() {
    console.log('Education Management System Initialized');
    
    // Add smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ANIMATED PARTICLES
// ============================================

function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
}

// ============================================
// SIDEBAR FUNCTIONALITY
// ============================================

function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Active link management
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && 
            !sidebar.contains(e.target) && 
            e.target !== toggleBtn) {
            sidebar.classList.remove('active');
        }
    });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

function initializeModals() {
    // Modal triggers
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            openModal(modalId);
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.stat-card, .content-card, .table-container').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showFieldError(input, 'Bu maydon to\'ldirilishi shart');
        } else {
            input.classList.remove('error');
            hideFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('field-error')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
}

function hideFieldError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('field-error')) {
        errorDiv.remove();
    }
}

// ============================================
// AJAX HELPERS
// ============================================

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        showNotification('Xatolik yuz berdi!', 'error');
        throw error;
    }
}

async function submitForm(formId, url) {
    const form = document.getElementById(formId);
    if (!form || !validateForm(formId)) return;
    
    const formData = new FormData(form);
    
    try {
        const response = await fetchData(url, {
            method: 'POST',
            body: formData
        });
        
        if (response.success) {
            showNotification(response.message || 'Muvaffaqiyatli saqlandi!', 'success');
            form.reset();
            return response;
        } else {
            showNotification(response.message || 'Xatolik yuz berdi!', 'error');
        }
    } catch (error) {
        showNotification('Xatolik yuz berdi!', 'error');
    }
}

// ============================================
// CHART INITIALIZATION (for dashboard)
// ============================================

function initializeCharts() {
    // This function can be extended with Chart.js or other chart libraries
    console.log('Charts initialized');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(date) {
    return new Date(date).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // Implement search logic here
    }, 300));
}

// ============================================
// LOADING STATE
// ============================================

function showLoading(element) {
    element.classList.add('loading-state');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading-state');
    element.style.pointerEvents = '';
}

// ============================================
// DROPDOWN MENUS
// ============================================

document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.nextElementSibling;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.remove('active');
            }
        });
        
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================

window.showNotification = showNotification;
window.openModal = openModal;
window.closeModal = closeModal;
window.validateForm = validateForm;
window.submitForm = submitForm;
window.fetchData = fetchData;
