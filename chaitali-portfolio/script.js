// ============================================
// PROFESSIONAL PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioContent();
    initializeInteractivity();
    initializeAnimations();
});

// ============================================
// LOAD CONTENT FROM CONFIG
// ============================================
function loadPortfolioContent() {
    // Navigation Logo
    document.getElementById('nav-logo').textContent = portfolioConfig.personal.name.split(' ')[0];

    // Hero Section
    document.getElementById('hero-badge').textContent = portfolioConfig.hero.badge;
    document.getElementById('hero-title').textContent = portfolioConfig.hero.title;
    document.getElementById('hero-subtitle').textContent = portfolioConfig.hero.subtitle;
    document.getElementById('hero-description').textContent = portfolioConfig.hero.description;

    // Hero Stats
    const heroStats = document.getElementById('hero-stats');
    heroStats.innerHTML = '';
    portfolioConfig.hero.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        heroStats.appendChild(statItem);
    });

    // About Section
    document.getElementById('about-title').textContent = portfolioConfig.about.title;
    document.getElementById('about-lead').textContent = portfolioConfig.about.lead;
    document.getElementById('about-description').textContent = portfolioConfig.about.description;

    const aboutHighlights = document.getElementById('about-highlights');
    aboutHighlights.innerHTML = '';
    portfolioConfig.about.highlights.forEach(highlight => {
        const highlightItem = document.createElement('div');
        highlightItem.className = 'highlight-item';
        highlightItem.innerHTML = `
            <span class="highlight-icon">${highlight.icon}</span>
            <span class="highlight-text">${highlight.text}</span>
        `;
        aboutHighlights.appendChild(highlightItem);
    });

    // Expertise Section
    const expertiseGrid = document.getElementById('expertise-grid');
    expertiseGrid.innerHTML = '';
    portfolioConfig.expertise.forEach(item => {
        const card = document.createElement('div');
        card.className = 'expertise-card';
        card.innerHTML = `
            <span class="expertise-icon">${item.icon}</span>
            <h3 class="expertise-title">${item.title}</h3>
            <p class="expertise-description">${item.description}</p>
            <ul class="expertise-list">
                ${item.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
        expertiseGrid.appendChild(card);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';
    portfolioConfig.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <span class="skill-icon">${skill.icon}</span>
            <div class="skill-name">${skill.name}</div>
        `;
        skillsGrid.appendChild(skillItem);
    });

    // Portfolio Filters
    const portfolioFilters = document.getElementById('portfolio-filters');
    portfolioFilters.innerHTML = '';
    const categories = ['All', ...new Set(portfolioConfig.portfolio.map(item => item.category))];
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn' + (category === 'All' ? ' active' : '');
        filterBtn.textContent = category;
        filterBtn.setAttribute('data-filter', category);
        portfolioFilters.appendChild(filterBtn);
    });

    // Portfolio Items
    loadPortfolioItems('All');

    // Experience Timeline
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    portfolioConfig.experience.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.position}</h3>
                <div class="timeline-company">${item.company}</div>
                <p class="timeline-description">${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        `;
        timeline.appendChild(timelineItem);
    });

    // Testimonials
    const testimonialsGrid = document.getElementById('testimonials-grid');
    testimonialsGrid.innerHTML = '';
    portfolioConfig.testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        const initials = testimonial.author.split(' ').map(n => n[0]).join('');
        card.innerHTML = `
            <div class="quote-icon">"</div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        `;
        testimonialsGrid.appendChild(card);
    });

    // Contact Section
    document.getElementById('contact-description').textContent = portfolioConfig.contact.description;

    const contactDetails = document.getElementById('contact-details');
    contactDetails.innerHTML = '';
    
    // Email
    const emailItem = document.createElement('div');
    emailItem.className = 'contact-item';
    emailItem.innerHTML = `
        <div class="contact-item-icon">📧</div>
        <div class="contact-item-content">
            <h4>Email</h4>
            <a href="mailto:${portfolioConfig.contact.email}">${portfolioConfig.contact.email}</a>
        </div>
    `;
    contactDetails.appendChild(emailItem);

    // Phone
    const phoneItem = document.createElement('div');
    phoneItem.className = 'contact-item';
    phoneItem.innerHTML = `
        <div class="contact-item-icon">📱</div>
        <div class="contact-item-content">
            <h4>Phone</h4>
            <a href="tel:${portfolioConfig.contact.phone}">${portfolioConfig.contact.phone}</a>
        </div>
    `;
    contactDetails.appendChild(phoneItem);

    // Location
    const locationItem = document.createElement('div');
    locationItem.className = 'contact-item';
    locationItem.innerHTML = `
        <div class="contact-item-icon">📍</div>
        <div class="contact-item-content">
            <h4>Location</h4>
            <p>${portfolioConfig.contact.location}</p>
        </div>
    `;
    contactDetails.appendChild(locationItem);

    // Social Links
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = '';
    portfolioConfig.contact.social.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.className = 'social-link';
        link.textContent = social.icon;
        link.title = social.platform;
        socialLinks.appendChild(link);
    });

    // Footer
    document.getElementById('footer-text').textContent = `${portfolioConfig.personal.name} - ${portfolioConfig.hero.subtitle}`;
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// ============================================
// LOAD PORTFOLIO ITEMS
// ============================================
function loadPortfolioItems(filter) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioGrid.innerHTML = '';
    
    const filteredItems = filter === 'All' 
        ? portfolioConfig.portfolio 
        : portfolioConfig.portfolio.filter(item => item.category === filter);

    filteredItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <div class="portfolio-image">${item.icon}</div>
            <div class="portfolio-content">
                <span class="portfolio-category">${item.category}</span>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="portfolio-link">Read More →</a>` : ''}
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// ============================================
// INITIALIZE INTERACTIVITY
// ============================================
function initializeInteractivity() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Portfolio Filters
    document.getElementById('portfolio-filters').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Filter portfolio items
            const filter = e.target.getAttribute('data-filter');
            loadPortfolioItems(filter);
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form. In a real website, this would send your message.');
        contactForm.reset();
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INITIALIZE ANIMATIONS
// ============================================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
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
