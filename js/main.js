// UPMind — Main JS

(function () {
    'use strict';

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('navbar__nav--open');
            navToggle.classList.toggle('navbar__toggle--open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('navbar__nav--open');
                navToggle.classList.remove('navbar__toggle--open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Navbar scroll effect
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
        }, { passive: true });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item__question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('faq-item--open');

            // Close all
            document.querySelectorAll('.faq-item--open').forEach(function (openItem) {
                openItem.classList.remove('faq-item--open');
                openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('faq-item--open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Cookie Banner
    var cookieBanner = document.getElementById('cookie-banner');
    var cookieAccept = document.getElementById('cookie-accept');
    var cookieReject = document.getElementById('cookie-reject');

    if (cookieBanner && !localStorage.getItem('cookie-consent')) {
        setTimeout(function () {
            cookieBanner.classList.add('cookie-banner--visible');
        }, 1000);
    }

    function hideCookieBanner(choice) {
        localStorage.setItem('cookie-consent', choice);
        cookieBanner.classList.remove('cookie-banner--visible');
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            hideCookieBanner('accepted');
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', function () {
            hideCookieBanner('rejected');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll-driven fade-in for sections
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(function (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
})();
