// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

// Mobile Navigation Toggle
const mobileToggleBtn = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
    });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('mobile-active');
    });
});

// Dashboard Showcase Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const contentElem = document.getElementById(targetTab);
        if (contentElem) contentElem.classList.add('active');
    });
});

// Code Snippet Tabs (DAX / SQL)
const codeTabs = document.querySelectorAll('.code-tab');
const codeBlocks = document.querySelectorAll('.code-block');
let activeCodeType = 'dax';

codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activeCodeType = tab.getAttribute('data-code');

        codeTabs.forEach(t => t.classList.remove('active'));
        codeBlocks.forEach(b => b.classList.remove('active'));

        tab.classList.add('active');
        const codeElem = document.getElementById(`code-${activeCodeType}`);
        if (codeElem) codeElem.classList.add('active');
    });
});

// Copy Code Functionality
function copyCurrentCode() {
    const activeBlock = document.getElementById(`code-${activeCodeType}`);
    if (!activeBlock) return;
    
    const activeCode = activeBlock.innerText;
    navigator.clipboard.writeText(activeCode).then(() => {
        const copyBtn = document.getElementById('copyCodeBtn');
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Code';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Lightbox Modal for Fullscreen Dashboard Inspection
function openLightbox(imgSrc, title) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && img && caption) {
        img.src = imgSrc;
        caption.innerText = title;
        modal.classList.add('active');
    }
}

function closeLightbox(e) {
    if (e.target.id === 'lightboxModal') {
        document.getElementById('lightboxModal').classList.remove('active');
    }
}

function closeLightboxForce() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
}

// Power BI Embed Simulation / Live Link Loader
function loadSampleEmbed() {
    const placeholder = document.getElementById('iframePlaceholder');
    const frame = document.getElementById('powerbiFrame');
    
    // Replace sample URL with actual published Power BI iframe URL if needed
    const sampleUrl = "https://app.powerbi.com/view?r=eyJrIjoisample-embedded-demo";

    if (placeholder && frame) {
        placeholder.style.display = 'none';
        frame.style.display = 'block';
        frame.src = sampleUrl;
    }
}

// Active Nav Link Scroll Highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
