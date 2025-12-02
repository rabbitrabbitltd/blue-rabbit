// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    try {
        // Smooth scroll for navigation links
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

        // Add scroll effect to navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            });
        }

        // Add fade-in animation on scroll (progressive enhancement)
        // Ensure all content is visible by default - this is critical for accessibility
        const sections = document.querySelectorAll('section > .container');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        
        // Only apply fade-in animation if IntersectionObserver is supported
        // This is a progressive enhancement - if it fails, content remains visible
        if ('IntersectionObserver' in window && sections.length > 1) {
            try {
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

                // Apply fade-in effect only to sections below the fold
                // Use requestAnimationFrame to ensure DOM is ready
                requestAnimationFrame(() => {
                    sections.forEach((section, index) => {
                        // Always keep first section (hero) visible
                        if (index === 0) {
                            return;
                        }
                        
                        const rect = section.getBoundingClientRect();
                        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        // Only hide sections that are definitely below the viewport
                        if (rect.top > window.innerHeight) {
                            section.style.opacity = '0';
                            section.style.transform = 'translateY(20px)';
                            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            observer.observe(section);
                        }
                    });
                });
            } catch (observerError) {
                console.warn('IntersectionObserver setup failed, content remains visible:', observerError);
            }
        }

        // Gallery item hover effect enhancement
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        });

        // Pricing card interaction
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        });

        // Add click tracking for CTA buttons (placeholder for analytics)
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                // You can add analytics tracking here
                console.log('CTA clicked:', this.textContent);
            });
        });
    } catch (error) {
        console.error('Error initializing page:', error);
        // Ensure content is visible even if there's an error
        document.querySelectorAll('section > .container').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
});




