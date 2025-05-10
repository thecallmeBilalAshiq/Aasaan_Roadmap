// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Handle forgot password form
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Password reset link has been sent to your email!');
        this.reset();
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
        modal.hide();
    });
    
    // Handle login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login successful!');
        this.reset();
    });
    
    // Handle signup form
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for signing up! Check your email for confirmation.');
        this.reset();
    });
    
    // Style the auth tabs to match the design
    const authTabs = document.querySelectorAll('#authTabs .nav-link');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            authTabs.forEach(t => t.classList.remove('active-tab'));
            this.classList.add('active-tab');
        });
        
        // Add styles for the tabs
        tab.style.background = tab.classList.contains('active') ? 'linear-gradient(45deg, var(--primary), var(--secondary))' : 'transparent';
        tab.style.color = tab.classList.contains('active') ? 'white' : 'var(--text-dark)';
        tab.style.borderRadius = '30px';
        tab.style.fontWeight = '600';
        tab.style.transition = 'all 0.3s';
        
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(255, 62, 143, 0.1)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'transparent';
            }
        });
    });
    
    // Update tab styles when clicked
    const pillsTab = document.getElementById('authTabs');
    pillsTab.addEventListener('shown.bs.tab', function(e) {
        const activeTab = e.target; // newly activated tab
        const previousTab = e.relatedTarget; // previous active tab
        
        activeTab.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
        activeTab.style.color = 'white';
        
        previousTab.style.background = 'transparent';
        previousTab.style.color = 'var(--text-dark)';
    });
    
    // Style the forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    forgotPasswordLink.style.color = 'var(--primary)';
    forgotPasswordLink.style.textDecoration = 'none';
    forgotPasswordLink.style.fontWeight = '500';
    forgotPasswordLink.style.transition = 'all 0.3s';
    
    forgotPasswordLink.addEventListener('mouseenter', function() {
        this.style.color = 'var(--secondary)';
        this.style.textDecoration = 'underline';
    });
    
    forgotPasswordLink.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary)';
        this.style.textDecoration = 'none';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Form submission handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
    
    // 3D card effect on mouse move
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
    
    // Animation for stats numbers
    function animateStats() {
        const statsElements = [
            { id: 'stats-users', target: '3M+', start: 0, prefix: '', suffix: 'M+' },
            { id: 'stats-roadmaps', target: '25+', start: 0, prefix: '', suffix: '+' },
            { id: 'stats-guides', target: '100+', start: 0, prefix: '', suffix: '+' },
            { id: 'stats-contributors', target: '500+', start: 0, prefix: '', suffix: '+' }
        ];
        
        statsElements.forEach(stat => {
            const element = document.getElementById(stat.id);
            const target = parseInt(stat.target);
            let current = stat.start;
            const duration = 2000; // 2 seconds
            const increment = Math.ceil(target / (duration / 20)); // Update every 20ms
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = `${stat.prefix}${current}${stat.suffix}`;
            }, 20);
        });
    }
    
    // Intersection Observer for triggering animations when elements come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'stats-users') {
                    animateStats();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Run animations when page loads
    window.addEventListener('load', function() {
        // Add a class to trigger initial animations
        document.body.classList.add('page-loaded');
        
        // Animate elements that are already in viewport
        setTimeout(() => {
            const elementsInView = document.querySelectorAll('.stats-section');
            elementsInView.forEach(el => {
                if (isElementInViewport(el)) {
                    animateStats();
                }
            });
        }, 500);
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Dropdown menu animation
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'translateY(0)';
                menu.style.visibility = 'visible';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(20px)';
            menu.style.visibility = 'hidden';
            setTimeout(() => {
                if (menu.style.visibility === 'hidden') {
                    menu.style.display = 'none';
                }
            }, 300);
        });
    });
});