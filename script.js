
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    const links = document.querySelectorAll('.nav-link, .btn, .social-icons a, .project-card, .skill-card, .experience-card, .education-card, .certification-card, .contact-info a, .contact-form input, .contact-form textarea, .contact-form button');
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    // Cursor Effect
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;
    let targetGlowX = 0, targetGlowY = 0;
    const ease = 0.1;

    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursorGlow.style.opacity = '1';

        targetX = e.clientX;
        targetY = e.clientY;
        targetGlowX = e.clientX;
        targetGlowY = e.clientY;
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * ease;
        cursorY += (targetY - cursorY) * ease;
        glowX += (targetGlowX - glowX) * ease;
        glowY += (targetGlowY - glowY) * ease;

        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorGlow.style.transform = `translate(${targetGlowX}px, ${targetGlowY}px) scale(1.5)`;
            cursorGlow.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.transform = `translate(${targetGlowX}px, ${targetGlowY}px) scale(1)`;
            cursorGlow.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
        });
    });

    // Smooth Scrolling & Active Link
    const navLinksElements = document.querySelectorAll('.nav-link');
    navLinksElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Close hamburger menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Highlight active link on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Simulate sending message
        console.log('Form submitted:', { name, email, message });

        // Show success toast
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);

        // Clear form
        contactForm.reset();
    });

    // Scroll Reveal Animations for Sections
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });
    
    // Initial animation for hero section elements
    const heroContent = document.querySelector('.hero-content');
    if(heroContent) {
        const heroName = heroContent.querySelector('.hero-name');
        const heroTitle = heroContent.querySelector('.hero-title');
        const heroSummary = heroContent.querySelector('.hero-summary');
        const heroButtons = heroContent.querySelector('.hero-buttons');
        const socialIcons = heroContent.querySelector('.social-icons');

        if(heroName) heroName.style.opacity = '1';
        if(heroTitle) heroTitle.style.opacity = '1';
        if(heroSummary) heroSummary.style.opacity = '1';
        if(heroButtons) heroButtons.style.opacity = '1';
        if(socialIcons) socialIcons.style.opacity = '1';
    }
    
    const heroImage = document.querySelector('.hero-image');
    if(heroImage) {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateX(0)';
    }

});
