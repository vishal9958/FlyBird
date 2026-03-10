// 1. EmailJS Initialization
if (typeof emailjs !== 'undefined') {
    emailjs.init("Dj8DYdhoPVzwH6Ses"); 
}

// 2. Tailwind Config
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 500: '#3b82f6',
          600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
        },
        accent: {
          400: '#fb923c', 500: '#f97316', 600: '#ea580c'
        }
      }
    }
  }
};

// --- Slideshow Logic ---
const images = [
    'images/pexels-albinberlin-906982.jpg',
    'images/pexels-andromeda99-20016292.jpg',
    'images/Gemini_Generated_Image_n6dq1an6dq1an6dq.png',
    'images/pexels-kindelmedia-9716368.jpg',
    'images/pexels-pixabay-262353.jpg',
    'images/pexels-pixabay-358319.jpg',
    'images/pexels-tomfisk-3063470.jpg',
    'images/pexels-tomfisk-3856433.jpg'
];

let currentIndex = 0;
const bgElement = document.querySelector('.hero-bg-image');

function changeBackground() {
    if (bgElement) {
        bgElement.style.opacity = '0.7'; 
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            bgElement.style.backgroundImage = `url('${images[currentIndex]}')`;
            bgElement.style.opacity = '1';
        }, 800);
    }
}

if (bgElement) {
    bgElement.style.transition = 'opacity 1s ease-in-out';
    setInterval(changeBackground, 5000); 
}

// --- Icons Initialization ---
function fixIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
fixIcons();

// --- Default Configuration (SDK) ---
const defaultConfig = {
    hero_title: 'Delivering Your <span class="text-amber-300">Packages</span> Worldwide',
    hero_subtitle: 'Experience lightning-fast courier services with real-time tracking.',
    tracking_placeholder: 'Enter tracking number...',
    services_title: 'Our Services',
    contact_title: 'Get a Free Quote',
    contact_email: 'support@swiftship.com',
    contact_phone: '+91 1800 123 4567',
    stats_deliveries: '10000',
    stats_cities: '500'
};

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
            // SDK Logic remains here if needed
            fixIcons();
        }
    });
}

// --- Mobile menu toggle ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- Tab switching for tracking ---
const tabTrack = document.getElementById('tab-track');
const tabStatus = document.getElementById('tab-status');
const trackContent = document.getElementById('track-content');
const statusContent = document.getElementById('status-content');

if (tabTrack && tabStatus) {
    tabTrack.addEventListener('click', () => {
        tabTrack.classList.add('active'); tabStatus.classList.remove('active');
        trackContent.classList.remove('hidden'); statusContent.classList.add('hidden');
    });
    tabStatus.addEventListener('click', () => {
        tabStatus.classList.add('active'); tabTrack.classList.remove('active');
        statusContent.classList.remove('hidden'); trackContent.classList.add('hidden');
    });
}

// --- Tracking Input Restriction ---
const trackingInput = document.getElementById('tracking-input');
if (trackingInput) {
    trackingInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// --- Tracking functionality ---
const trackBtn = document.getElementById('track-btn');
const trackingResult = document.getElementById('tracking-result');

if (trackBtn) {
    trackBtn.addEventListener('click', () => {
        const trackingNumber = trackingInput.value.trim();
        if (trackingNumber) {
            trackBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Loading...';
            trackBtn.disabled = true;
            fixIcons();
            
            setTimeout(() => {
                trackingResult.classList.remove('hidden');
                trackBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Track Now';
                trackBtn.disabled = false;
                if (tabStatus) { tabStatus.classList.remove('hidden'); tabStatus.click(); }
                if (statusContent) {
                    statusContent.innerHTML = `<div class="py-10 text-center"><h3 class="text-lg font-bold">Inquiry for ID: ${trackingNumber}</h3><p class="text-gray-500">Connecting to FlyBird live servers...</p></div>`;
                }
                fixIcons();
            }, 1500);
        }
    });
}

// --- Quote Form (CLEAN INTERNATIONAL LOGIC) ---
const quoteForm = document.getElementById('quote-form');
const phoneInput = document.getElementById('quote-phone');
const phoneError = document.getElementById('phone-error');

if (quoteForm && phoneInput) {
    // Sirf digits allow karo, length ki koi limit nahi
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
    });

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const actualNumber = phoneInput.value.trim();
        
        // Khali na ho bas ye check karo
        if (actualNumber === "") {
            phoneInput.classList.add('border-red-500');
            return;
        }

        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
        submitBtn.disabled = true;
        fixIcons();

        const templateParams = {
            name: quoteForm.querySelector('input[placeholder="John Doe"]').value,
            email: quoteForm.querySelector('input[type="email"]').value,
            phone: actualNumber, 
            service: quoteForm.querySelector('select').value,
            message: quoteForm.querySelector('textarea').value,
            title: "New Inquiry from FlyBird Website"
        };

        emailjs.send('service_62vc9nb', 'template_22kzrzf', templateParams)
            .then(() => {
                quoteForm.reset();
                document.getElementById('form-success').classList.remove('hidden');
                submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Request';
                submitBtn.disabled = false;
                fixIcons();
                setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000);
            }, (error) => {
                alert("Opps! Kuch gadbad ho gayi.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Request';
                fixIcons();
            });
    });
}

// --- Counter Logic ---
function animateCounters() {
    const counters = [
        { el: document.getElementById('counter-deliveries'), target: 150, duration: 2000 },
        { el: document.getElementById('counter-cities'), target: 200, duration: 2000 }
    ];
    const startTime = Date.now();
    counters.forEach(counter => {
        if (!counter.el) return;
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / counter.duration, 1);
            counter.el.textContent = Math.floor(counter.target * progress);
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    });
}

const statsSection = document.querySelector('section:has(#counter-deliveries)');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                animateCounters();
                entry.target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// --- FINAL PROTECTION ---
window.addEventListener('load', fixIcons);
setTimeout(fixIcons, 1000);