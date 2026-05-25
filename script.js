// Initialize Animations
AOS.init({ duration: 800, once: true, offset: 100 });
lucide.createIcons();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
        nav.classList.add('shadow-md', 'bg-white/85', 'dark:bg-slate-900/95');
        nav.classList.remove('bg-white/70', 'dark:bg-slate-900/80');
    } else {
        nav.classList.remove('shadow-md', 'bg-white/85', 'dark:bg-slate-900/95');
        nav.classList.add('bg-white/70', 'dark:bg-slate-900/80');
    }
});

// Smooth Scroll Logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        showToast('3D Dark Mode Enabled', 'moon');
    } else {
        localStorage.setItem('theme', 'light');
        showToast('Light Mode Enabled', 'sun');
    }
});

// Toast Notification System
function showToast(message, icon = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 text-blue-400"></i> <span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Stats Counter Animation
const counters = document.querySelectorAll('.stat-counter');
let hasCounted = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCounter();
    });
};

const statsSection = document.getElementById('stats');
if (statsSection && window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            animateCounters();
            hasCounted = true;
        }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
} else {
    animateCounters();
}

// Interactive Category Clicks
document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.closest('.glass-card-dark')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const title = link.querySelector('h4');
            if (title) {
                showToast(`Exploring ${title.innerText} catalog...`, 'package');
            }
        });
    }
});

// Dynamic Greeting based on time of day
const setGreeting = () => {
    const hour = new Date().getHours();
    let greetingText = 'Welcome to';
    if (hour >= 5 && hour < 12) {
        greetingText = 'Good Morning, Welcome to';
    } else if (hour >= 12 && hour < 18) {
        greetingText = 'Good Afternoon, Welcome to';
    } else if (hour >= 18 || hour < 5) {
        greetingText = 'Good Evening, Welcome to';
    }
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) greetingElement.innerText = greetingText;
};
setGreeting();

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-8');
        scrollToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-8');
        scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});