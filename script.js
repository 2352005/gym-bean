// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const galleryItems = document.querySelectorAll('.gallery-item');

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elementsToAnimate = entry.target.querySelectorAll('.fade-in');
                elementsToAnimate.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial animations
    document.querySelector('.hero-content').classList.add('show');

    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    setTimeout(() => {
        ctaButton.classList.add('pulse');
    }, 2000);

    // Initialize gallery items click for modal (if implemented)
    initGalleryModal();
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add background to header when scrolled
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show or hide back to top button
    if (scrollPosition > 600) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Highlight active nav link based on scroll position
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === currentSection) {
            item.classList.add('active');
        }
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Back to top button functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in a real project, you'd send to a backend)
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = 'Thank you! Your message has been sent successfully.';
            
            contactForm.appendChild(successMessage);
            
            // Reset button and form
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            contactForm.reset();
            
            // Show success message with animation
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 500);
            }, 5000);
        }, 1500);
    });
}

// Gallery modal functionality
function initGalleryModal() {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            // Create modal elements
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${imgSrc}" alt="${imgAlt}" class="modal-image">
                </div>
            `;
            
            // Add to DOM
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // Close modal when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });
}

// Animate counters on scroll (for statistics if added)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500; // ms
        const step = target / (duration / 16); // update every 16ms (60fps)
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Animate skill bars on scroll (if added to About section)
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// Add smooth parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Apply parallax to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Implement testimonial slider functionality if added
function initTestimonialSlider() {
    const testimonialSlide = document.querySelector('.testimonial-slide');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentIndex = 0;
    
    if (!testimonialSlide) return;
    
    // Set initial position
    updateSlidePosition();
    
    // Next button functionality
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlidePosition();
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlidePosition();
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlidePosition();
    }, 5000);
    
    function updateSlidePosition() {
        testimonialSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// Add button hover animations
const buttons = document.querySelectorAll('.cta-button, .plan-button, .submit-btn');
buttons.forEach(button => {
    button.classList.add('btn-animate');
});

// Create a typing animation for hero section
function typingAnimation() {
    const textElement = document.querySelector('.hero-content h2');
    const text = textElement.innerText;
    textElement.innerText = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            textElement.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Add AOS (Animate on Scroll) like functionality
function initAOS() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-down, .slide-left, .slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize all animations and features
function init() {
    // Initialize animation functions if elements exist
    const skillBars = document.querySelectorAll('.progress-fill');
    if (skillBars.length > 0) {
        animateSkillBars();
    }
    
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        animateCounters();
    }
    
    const testimonialSlider = document.querySelector('.testimonial-slide');
    if (testimonialSlider) {
        initTestimonialSlider();
    }
    
    // Initialize AOS-like functionality
    initAOS();
}

// Run initialization after DOM is fully loaded
window.addEventListener('load', init);