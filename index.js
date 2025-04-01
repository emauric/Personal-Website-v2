// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const icon = themeToggle.querySelector('i');
    const logoImg = document.querySelector('.header-logo');

    // Define image paths
    const darkModeLogo = 'assets/ship-logo.svg';
    const lightModeLogo = 'assets/ship-logo-dark.svg';  // You'll need to create this version

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.dataset.theme = savedTheme;
        updateIcon(savedTheme === 'light');
        updateLogo(savedTheme === 'light');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isLight = root.dataset.theme === 'light';
        root.dataset.theme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', root.dataset.theme);
        updateIcon(!isLight);
        updateLogo(!isLight);
    });

    // Update icon based on theme
    function updateIcon(isLight) {
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Update logo based on theme
    function updateLogo(isLight) {
        logoImg.src = isLight ? lightModeLogo : darkModeLogo;
    }

    // Calculate and update age
    function updateAge() {
        const birthDate = new Date('2004-10-02');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.textContent = age;
        }
    }

    // Update age when the page loads
    updateAge();
    
    // Update age every day at midnight
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            updateAge();
        }
    }, 60000); // Check every minute
});

// Smooth scrolling for navigation links
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

// Add active state to navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
