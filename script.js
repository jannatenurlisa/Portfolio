
// Sparkles Background
window.addEventListener('DOMContentLoaded', () => {
    const sparkleCount = 111;
    const container = document.querySelector('.sparkles');

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.width = sparkle.style.height = (Math.random() * 2 + 1) + 'px';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        sparkle.style.background = 'rgba(255, 255, 255, ' + (Math.random() * 0.6 + 0.2) + ')';

        container.appendChild(sparkle);
    }
});


// Sparkles

const brandName = document.querySelector('.brand-name');

const rect = brandName.getBoundingClientRect();
const sparkleCount = 12;
for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + (Math.random() * 20 - 10) + 'px';
    sparkle.style.left = rect.left + rect.width / 2 + (Math.random() * 20 - 10) + 'px';
    sparkle.style.background = 'rgba(214,173,96,0.9)';
    sparkle.style.animationDuration = (Math.random() * 1 + 0.8) + 's';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
};


// Smooth Scroll

const topBar = document.querySelector('.top-bar');
const topBarHeight = topBar.offsetHeight;

const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('.content-section');

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - topBarHeight - 10;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + topBarHeight + 20;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-list a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});
