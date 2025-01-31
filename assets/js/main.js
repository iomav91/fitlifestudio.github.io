
document.addEventListener('DOMContentLoaded', () => {

    //trackPageLoadTime();
    //trackFID();
    //trackScrollDepth();
    //trackTimeOnPage();
    
    // Menu toggle
    const menuButton = document.querySelector('#mobile-menu-button');
    const menu = document.querySelector('#mobile-menu');
    
    menuButton?.addEventListener('click', () => {
        menu?.classList.toggle('hidden');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    

    // First verify elements exist
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;

    // Create indicators container if it doesn't exist
    let indicatorsContainer = document.querySelector('.slide-indicators');
    if (!indicatorsContainer) {
        indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slide-indicators';
        slideshowContainer.appendChild(indicatorsContainer);
    }

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Change slide every 2 seconds
    setInterval(nextSlide, 10000);

    const tabs = document.querySelectorAll('.schedule-tab');
    const contents = document.querySelectorAll('.schedule-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;
            
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            document.querySelector(`.schedule-content[data-day="${day}"]`).classList.add('active');
        });
    });

    // Implement lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
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

    
    // Optimize scroll animations
    const scrollHandler = debounce(() => {
        // Scroll-based animations logic
    }, 16);

    window.addEventListener('scroll', scrollHandler);

    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.remove('opacity-100');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
