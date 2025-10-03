//canvas network
const canvas = document.getElementById('networkCanvas');
        const ctx = canvas.getContext('2d');

        let width, height, points;

        const maxDistance = 150;
        const pointRadius = 3;
        const speed = 0.3;

        // Point object
        class Point {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
            }

            move() {
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, pointRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#0088ff';
                ctx.fill();
            }
        }

        function distance(p1, p2) {
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function connectPoints() {
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    let dist = distance(points[i], points[j]);
                    if (dist < maxDistance) {
                        ctx.strokeStyle = `rgba(0, 136, 255, ${(maxDistance - dist) / maxDistance * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            points.forEach(p => {
                p.move();
                p.draw();
            });

            connectPoints();
            requestAnimationFrame(animate);
        }

        function setupCanvas() {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            points = [];
            for (let i = 0; i < 35; i++) {
                points.push(new Point());
            }
        }

        window.addEventListener('resize', () => {
            setupCanvas();
        });

        setupCanvas();
        animate();





// Apple-styled Portfolio JavaScript - Black & White Theme
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initProjectFiltering();
    initContactForm();
    initFloatingElements();
    initParallaxEffects();
    initAppleStyleEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => navObserver.observe(section));

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = [
        '.section-title',
        '.section-subtitle',
        '.experience-card',
        '.project-card',
        '.skill-item'
    ];

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            scrollObserver.observe(element);
        });
    });

    // Staggered animation for skills grid
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (skillItems.length > 0) {
        skillObserver.observe(skillItems[0]);
    }
}

// Project filtering functionality
function initProjectFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';

                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input');
    const submitBtn = form.querySelector('.btn-submit');

    // Enhanced input animations
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
    });

    // Form submission with animation
    form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const to = 'roycenoel2001@gmail.com';
  const subject = `Portfolio contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const gmailURL =
    'https://mail.google.com/mail/?view=cm&fs=1' +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(gmailURL, '_blank', 'noopener');
});


}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        // Random initial position and animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;

        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;

        // Mouse interaction
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
            element.style.transform = 'scale(1.1)';
            element.style.opacity = '0.2';
        });

        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
            element.style.transform = 'scale(1)';
            element.style.opacity = '0.1';
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            if (scrolled < window.innerHeight) {
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });
}

// Apple-style effects
function initAppleStyleEffects() {
    // Scale effect for buttons and interactive elements
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-resume, .btn-submit, .btn-outline, .category-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', () => {
            element.style.transform = 'scale(0.95)';
        });

        element.addEventListener('mouseup', () => {
            element.style.transform = 'scale(1)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });

    // Card hover effects with Apple-style elevation
    const cards = document.querySelectorAll('.experience-card, .project-card, .skill-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        });

        card.addEventListener('mouseleave', function (e) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
        });
    });

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(0.98) translateY(-2px)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Fixed utility function for proper navigation
function scrollToSection(sectionId) {
    let targetSection;

    // Handle specific section mappings
    switch (sectionId) {
        case 'home':
            targetSection = document.getElementById('home');
            break;
        case 'about':
            targetSection = document.getElementById('about');
            break;
        case 'projects':
            targetSection = document.getElementById('projects');
            break;
        case 'skills':
            targetSection = document.getElementById('skills');
            break;
        case 'contact':
            targetSection = document.getElementById('contact');
            break;
        default:
            targetSection = document.getElementById(sectionId);
    }

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Enhanced button ripple effect for Apple-style interaction
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .btn-outline');

    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect and other Apple-style enhancements
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .btn-submit, .btn-outline, .category-btn, .btn-resume {
        position: relative;
        overflow: hidden;
        transition: all 0.2s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
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
    
    .form-group.focused .form-input {
        border-color: #000000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    }
    
    .form-group.filled .form-label {
        color: #000000;
    }
    
    .nav-link.active {
        color: #000000;
        font-weight: 500;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Apple-style focus states */
    .btn-primary:focus,
    .btn-secondary:focus,
    .btn-submit:focus,
    .btn-outline:focus,
    .category-btn:focus,
    .btn-resume:focus {
        outline: 2px solid #000000;
        outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    .experience-card,
    .project-card,
    .skill-item,
    .social-link {
        transition: all 0.3s ease-out;
    }
    
    /* Enhanced hover states */
    .btn-primary:hover,
    .btn-secondary:hover,
    .btn-submit:hover,
    .btn-outline:hover,
    .category-btn:hover,
    .btn-resume:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
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
    // Additional scroll-based animations can be added here
    const scrolled = window.pageYOffset;
    const navbar = document.getElementById('navbar');

    // Enhanced navbar effect
    if (scrolled > 50) {
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.webkitBackdropFilter = 'blur(10px)';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #000000;
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    .keyboard-nav .btn-primary:focus,
    .keyboard-nav .btn-secondary:focus,
    .keyboard-nav .btn-submit:focus,
    .keyboard-nav .btn-outline:focus,
    .keyboard-nav .category-btn:focus,
    .keyboard-nav .btn-resume:focus {
        outline: 3px solid #000000;
        outline-offset: 3px;
    }
`;
document.head.appendChild(keyboardStyle);

// Enhanced mobile touch interactions
if ('ontouchstart' in window) {
    const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .btn-outline, .category-btn, .btn-resume');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });

        element.addEventListener('touchend', function () {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}