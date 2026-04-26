// Theme toggle (persists choice + respects system preference)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add(theme === 'light' ? 'fa-sun' : 'fa-moon');
    }
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
    try {
        localStorage.setItem('theme', theme);
    } catch (_) {
        // Ignore storage errors (private mode, blocked storage, etc.)
    }
}

if (themeToggle && themeIcon) {
    let initialTheme = null;
    try {
        initialTheme = localStorage.getItem('theme');
    } catch (_) {
        initialTheme = null;
    }

    // Default to system preference (light = white, dark = black), unless user picked otherwise.
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(initialTheme === 'light' || initialTheme === 'dark' ? initialTheme : 'light');

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
    });
}

// Footer year (for every page)
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button');
        const responseMsg = document.getElementById('response-msg');
        responseMsg.textContent = '';

        // UI Feedback
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        // Ensure these IDs match the 'id' attributes in your index.html exactly
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject') ? document.getElementById('subject').value : "No Subject",
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                responseMsg.textContent = "Success! Your message was sent.";
                e.target.reset();
            } else {
                responseMsg.textContent = "Sorry—something went wrong. Please try again.";
            }
        } catch (err) {
            responseMsg.textContent = "Server Error. Make sure your backend is running!";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
        }
    });
}

// Navbar active state + optional one-page scroll-spy
const backToTopBtn = document.querySelector('.back-to-top');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

function setActiveNavById(activeId, links) {
    links.forEach((a) => {
        const href = a.getAttribute('href');
        const id = href ? href.replace('#', '') : '';
        if (id === activeId) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });
}

function normalizePage(path) {
    const clean = path.split('/').pop() || 'index.html';
    return clean.toLowerCase();
}

if (navLinks.length > 0) {
    const pageLinks = navLinks.filter((a) => {
        const href = a.getAttribute('href') || '';
        return href && !href.startsWith('#');
    });

    const hashLinks = navLinks.filter((a) => {
        const href = a.getAttribute('href') || '';
        return href.startsWith('#');
    });

    // Multi-page nav highlighting (index.html, about.html, etc.)
    if (pageLinks.length > 0) {
        const current = normalizePage(window.location.pathname);
        pageLinks.forEach((a) => {
            const href = (a.getAttribute('href') || '').split('?')[0].split('#')[0];
            const target = normalizePage(href);
            if (target === current) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });
    }

    // Optional one-page scroll spy (if using hash links)
    const sections = hashLinks
        .map((a) => a.getAttribute('href')?.replace('#', ''))
        .map((id) => (id ? document.getElementById(id) : null))
        .filter(Boolean);

    if (hashLinks.length > 0 && sections.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

                if (!visible) return;
                setActiveNavById(visible.target.id, hashLinks);
            },
            {
                threshold: [0.2, 0.35, 0.5],
                rootMargin: '-15% 0px -70% 0px'
            }
        );

        sections.forEach((section) => observer.observe(section));
    }
}

// Back-to-top visibility (works on all pages)
if (backToTopBtn) {
    const onScroll = () => {
        if (window.scrollY > 450) backToTopBtn.classList.add('is-visible');
        else backToTopBtn.classList.remove('is-visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Mobile Sidebar Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden'; // stop page scrolling
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    // Close sidebar when clicking a link
    const sidebarLinks = navLinksContainer.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });
}