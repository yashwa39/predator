// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const themeToggle = document.getElementById('theme-toggle');
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieReject = document.getElementById('cookie-reject');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Tab functionality for How It Works section
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetTab = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate statistics when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target); // Only animate once
            }
            
            // Add animation classes to other elements
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number, .feature-card, .team-card, .problem-card').forEach(el => {
    observer.observe(el);
});

// Sensor Demo Simulation
function simulateDetection() {
    const sensorStrip = document.getElementById('sensor-strip');
    const meterFill = document.getElementById('meter-fill');
    const demoResults = document.getElementById('demo-results');
    
    // Reset
    sensorStrip.querySelector('.color-indicator').style.width = '0%';
    meterFill.style.width = '0%';
    demoResults.textContent = '';
    
    // Simulate detection
    setTimeout(() => {
        sensorStrip.querySelector('.color-indicator').style.width = '75%';
        meterFill.style.width = '75%';
        
        // Show results
        setTimeout(() => {
            demoResults.innerHTML = `
                <div style="color: #ff4444; font-weight: bold;">
                    ⚠️ HAZARD DETECTED!<br>
                    <small>Gas concentration: 75% - High Risk</small>
                </div>
            `;
        }, 1000);
    }, 500);
}

// Contact Form Validation and Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'interest', 'message'];
    let isValid = true;
    let errorMessage = '';
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
            errorMessage += `${field.charAt(0).toUpperCase() + field.slice(1)} is required. `;
        }
    });
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address. ';
    }
    
    if (!isValid) {
        showFormMessage(errorMessage, 'error');
        return;
    }
    
    // Simulate form submission
    showFormMessage('Sending message...', 'info');
    
    setTimeout(() => {
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        contactForm.reset();
    }, 2000);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animated-grid, .pulse-dots');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-tagline, .hero-mission, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize hero element styles
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-tagline, .hero-mission, .hero-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .team-card, .problem-card, .foundation-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn, .demo-btn, .tab-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, .demo-btn, .tab-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Accessibility improvements
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #ff4444';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Scroll progress bar update
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
    if (scrollProgress) {
        scrollProgress.style.width = `${progress * 100}%`;
    }
});

// Back to top visibility + behavior
window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark mode toggle with persistence and system preference
(function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = saved ? saved === 'dark' : prefersDark;
    document.body.classList.toggle('dark', shouldDark);
    updateThemeIcon();
})();

// Cookie consent banner logic
(function initCookieBanner() {
    const CONSENT_KEY = 'cookie_consent';
    function getConsent() {
        try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); } catch { return null; }
    }
    function setConsent(val) {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(val));
    }
    const consent = getConsent();
    if (!consent) {
        cookieBanner && (cookieBanner.style.display = 'block');
    }
    cookieAccept?.addEventListener('click', () => {
        setConsent({ accepted: true, ts: Date.now() });
        if (cookieBanner) cookieBanner.style.display = 'none';
    });
    cookieReject?.addEventListener('click', () => {
        setConsent({ accepted: false, ts: Date.now() });
        if (cookieBanner) cookieBanner.style.display = 'none';
    });
})();

function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = document.body.classList.contains('dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// Keyboard shortcut: toggle theme with "d"
document.addEventListener('keydown', (e) => {
    if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        themeToggle?.click();
    }
});

// Scrollspy: highlight active nav link while scrolling
(function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links = Array.from(document.querySelectorAll('.nav-link'));
    if (!sections.length || !links.length) return;

    const setActive = () => {
        const fromTop = window.scrollY + 80; // account for navbar height
        let currentId = sections[0].id;
        for (const section of sections) {
            if (section.offsetTop <= fromTop) currentId = section.id;
        }
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const id = href.slice(1);
            if (id === currentId) link.classList.add('active'); else link.classList.remove('active');
        });
    };
    window.addEventListener('scroll', throttle(setActive, 50));
    setActive();
})();

// Emergency Drill mini‑game
(function initDrill() {
    const openBtn = document.getElementById('open-drill');
    const modal = document.getElementById('drill-modal');
    const closeBtn = document.getElementById('drill-close');
    const startBtn = document.getElementById('drill-start');
    const resetBtn = document.getElementById('drill-reset');
    const canvas = document.getElementById('drill-canvas');
    const timeEl = document.getElementById('drill-time');
    const scoreEl = document.getElementById('drill-score');
    const bestEl = document.getElementById('drill-best');
    if (!openBtn || !modal || !canvas) return;

    const ctx = canvas.getContext('2d');
    let hazards = [];
    let playing = false;
    let score = 0;
    let best = parseInt(localStorage.getItem('drill_best') || '0');
    let timeLeft = 30;
    let lastSpawn = 0;
    let lastFrame = 0;
    let streak = 0; // for multiplier

    const hazardIcons = ['⚡','🔥','💨','💧','☢️','🚨','🧪'];
    function spawnHazard() {
        const size = 28 + Math.random() * 20;
        hazards.push({
            x: Math.random() * (canvas.width - size) + size/2,
            y: -size,
            vy: 80 + Math.random() * 120,
            size,
            icon: hazardIcons[Math.floor(Math.random()*hazardIcons.length)],
            alive: true
        });
    }

    function drawHazard(h) {
        ctx.font = `${h.size}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(h.icon, h.x, h.y);
    }

    function update(dt) {
        if (!playing) return;
        // spawn every ~450ms
        lastSpawn += dt;
        if (lastSpawn > 450) { spawnHazard(); lastSpawn = 0; }
        hazards.forEach(h => { h.y += h.vy * (dt/1000); if (h.y - h.size > canvas.height) { h.alive = false; streak = 0; } });
        hazards = hazards.filter(h => h.alive);
    }

    function render() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // background grid glow
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 68, 68, 0.08)';
        for (let x=0; x<canvas.width; x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
        for (let y=0; y<canvas.height; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
        ctx.restore();
        hazards.forEach(drawHazard);
    }

    function loop(ts) {
        if (!playing) { render(); return; }
        if (!lastFrame) lastFrame = ts;
        const dt = ts - lastFrame;
        lastFrame = ts;
        update(dt);
        render();
        requestAnimationFrame(loop);
    }

    function startGame() {
        score = 0; timeLeft = 30; hazards = []; playing = true; lastSpawn = 0; lastFrame = 0; streak = 0;
        scoreEl.textContent = String(score);
        bestEl.textContent = String(best);
        timeEl.textContent = String(timeLeft);
        const timer = setInterval(() => {
            if (!playing) { clearInterval(timer); return; }
            timeLeft -= 1;
            timeEl.textContent = String(timeLeft);
            if (timeLeft <= 0) {
                playing = false; clearInterval(timer);
                if (score > best) { best = score; localStorage.setItem('drill_best', String(best)); }
                bestEl.textContent = String(best);
            }
        }, 1000);
        requestAnimationFrame(loop);
    }

    function resetGame() {
        playing = false; hazards = []; render(); score = 0; timeLeft = 30; streak = 0;
        scoreEl.textContent = '0'; timeEl.textContent = '30'; bestEl.textContent = String(best);
    }

    function hitTest(x, y, h) {
        const dx = x - h.x; const dy = y - h.y; const r = h.size * 0.6;
        return dx*dx + dy*dy <= r*r;
    }

    canvas.addEventListener('click', (e) => {
        if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
        for (let i = hazards.length - 1; i >= 0; i--) {
            const h = hazards[i];
            if (hitTest(x, y, h)) {
                hazards.splice(i,1);
                streak = Math.min(streak + 1, 10);
                const gain = 10 * (1 + Math.floor(streak/3));
                score += gain;
                scoreEl.textContent = String(score);
                // pop effect
                ctx.save();
                ctx.fillStyle = 'rgba(255, 68, 68, 0.6)';
                ctx.beginPath(); ctx.arc(h.x, h.y, h.size/2 + 6, 0, Math.PI*2); ctx.fill();
                ctx.restore();
                break;
            }
        }
    });

    function openModal() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        best = parseInt(localStorage.getItem('drill_best') || '0');
        bestEl.textContent = String(best);
        resetGame();
    }
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        playing = false;
    }

    openBtn.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    startBtn?.addEventListener('click', startGame);
    resetBtn?.addEventListener('click', resetGame);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
})();

// --- Team card: tilt + popover interactions ---
(function enhanceTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');

    // Lightweight role descriptions mapped from heading text
    const roleDescriptions = {
        'Primary Researcher': 'Leads core research strategy and breakthroughs.',
        'Secondary Researcher': 'Runs supporting studies and validates results.',
        'Tertiary Researcher': 'Keeps research pipelines organized and documented.',
        'Critical Thinker': 'Pressure-tests ideas and assumptions across domains.',
        'Interdisciplinary Head': 'Connects physics, chemistry, and electronics efforts.',
        'Industry Collaborator': 'Bridges product needs with partner feedback loops.',
        'Cost Manager': 'Optimizes budgets and BOM without compromising quality.',
        'Project Manager': 'Synchronizes timelines, owners, and delivery risks.',
        'Marketing Manager': 'Crafts narratives and drives adoption channels.',
        'Employability Definer': 'Aligns roles and skills for workforce readiness.',
        'Learning Lead': 'Owns continuous learning and model improvement.'
    };

    // Card tilt effect
    teamCards.forEach(card => {
        const maxTilt = 8; // degrees
        let resetTimeout;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(resetTimeout);
            card.style.transform = 'translateY(0)';
        });

        // Click to toggle popover with details
        card.addEventListener('click', (e) => {
            // Avoid text selection issues
            e.preventDefault();

            // Close other popovers
            document.querySelectorAll('.team-card.team-expanded').forEach(other => {
                if (other !== card) {
                    other.classList.remove('team-expanded');
                    const p = other.querySelector('.team-popover');
                    if (p) p.remove();
                }
            });

            const existing = card.querySelector('.team-popover');
            if (existing) {
                card.classList.remove('team-expanded');
                existing.remove();
                return;
            }

            const title = (card.querySelector('h4')?.textContent || '').trim();
            const desc = roleDescriptions[title] || 'Contributes to mission-critical outcomes across the program.';

            const pop = document.createElement('div');
            pop.className = 'team-popover';
            pop.innerHTML = `
                <div class="team-popover-content">
                    <strong>${title}</strong>
                    <p>${desc}</p>
                    <button type="button" class="team-popover-close" aria-label="Close">Close</button>
                </div>
            `;
            card.appendChild(pop);
            card.classList.add('team-expanded');

            // Close handlers
            pop.querySelector('.team-popover-close').addEventListener('click', (ev) => {
                ev.stopPropagation();
                card.classList.remove('team-expanded');
                pop.remove();
            });
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        const open = document.querySelector('.team-card.team-expanded');
        if (!open) return;
        if (!open.contains(e.target)) {
            open.classList.remove('team-expanded');
            const p = open.querySelector('.team-popover');
            if (p) p.remove();
        }
    });
})();
