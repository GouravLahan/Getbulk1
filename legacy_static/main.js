document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const revealElements = document.querySelectorAll('.reveal');

    // Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Staggered & Fluid Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to the current element
                entry.target.classList.add('active');
                
                // If it's a grid container, also activate children with delay
                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax Effect for Hero
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            heroImage.style.transform = `translateY(${scroll * 0.15}px)`;
        });
    }

    // Smooth Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                console.log(`Scrolling to ${targetId}`);
                const navHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Target ${targetId} not found`);
            }
        });
    });
});
