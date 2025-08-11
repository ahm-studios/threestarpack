// Smooth scrolling for anchor links with progress indication
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const start = window.pageYOffset;
        const end = target.getBoundingClientRect().top + start;
        const duration = 1000;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeOutCubic(progress);
            window.scrollTo(0, start + (end - start) * ease);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Enhanced navbar scroll effect with transition
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scroll = window.pageYOffset;
        hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
    }
});

// Animate numbers when in viewport
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all animated elements
document.querySelectorAll('.feature, .partner-logo, .service-item').forEach((el) => {
    observer.observe(el);
});

// Mobile menu toggle
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
const navbar = document.querySelector('.navbar');
navbar.appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Hero Slideshow functionality
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    console.log('Found slides:', slides.length);
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 3000; // Change slide every 3 seconds for smoother experience
    
    function nextSlide() {
        console.log('Changing slide from', currentSlide, 'to', (currentSlide + 1) % slides.length);
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Start the slideshow
    setInterval(nextSlide, slideInterval);
    console.log('Slideshow started with interval:', slideInterval, 'ms');
}

// Initialize slideshow immediately and also when DOM is loaded
initHeroSlideshow();
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
});
