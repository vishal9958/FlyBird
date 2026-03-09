// 1. EmailJS Initialization (Sabse upar safe tarike se)
if (typeof emailjs !== 'undefined') {
    emailjs.init("Dj8DYdhoPVzwH6Ses"); 
}

// 2. Tailwind Config (Global Object Protection)
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
lucide.createIcons();

// --- Global Fix for Icons ---
function fixIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Default configuration
const defaultConfig = {
    hero_title: 'Delivering Your <span class="text-amber-300">Packages</span> Worldwide',
    hero_subtitle: 'Experience lightning-fast courier services with real-time tracking. From domestic to international shipments, we\'ve got you covered.',
    tracking_placeholder: 'Enter tracking number...',
    services_title: 'Our Services',
    contact_title: 'Get a Free Quote',
    contact_email: 'support@swiftship.com',
    contact_phone: '+91 1800 123 4567',
    stats_deliveries: '10000',
    stats_cities: '500',
    background_color: '#ffffff',
    primary_color: '#1e40af',
    text_color: '#111827',
    accent_color: '#f97316',
    secondary_color: '#3b82f6',
    font_family: 'Plus Jakarta Sans',
    font_size: 16
};

// Element SDK initialization
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
            const heroTitle = document.getElementById('hero-title');
            if (heroTitle) heroTitle.innerHTML = config.hero_title || defaultConfig.hero_title;
            
            const heroSubtitle = document.getElementById('hero-subtitle');
            if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;

            const trackingInput = document.getElementById('tracking-input');
            if (trackingInput) trackingInput.placeholder = config.tracking_placeholder || defaultConfig.tracking_placeholder;
            
            const servicesTitle = document.getElementById('services-title');
            if (servicesTitle) servicesTitle.textContent = config.services_title || defaultConfig.services_title;
            
            const contactTitle = document.getElementById('contact-title');
            if (contactTitle) contactTitle.textContent = config.contact_title || defaultConfig.contact_title;

            const contactEmailDisplay = document.getElementById('contact-email-display');
            const emailLink = document.getElementById('email-link');
            if (contactEmailDisplay) contactEmailDisplay.textContent = config.contact_email || defaultConfig.contact_email;
            if (emailLink) emailLink.href = `mailto:${config.contact_email || defaultConfig.contact_email}`;

            const contactPhoneDisplay = document.getElementById('contact-phone-display');
            const callLink = document.getElementById('call-link');
            const whatsappLink = document.getElementById('whatsapp-link');
            if (contactPhoneDisplay) contactPhoneDisplay.textContent = config.contact_phone || defaultConfig.contact_phone;
            if (callLink) {
                const phoneForCall = (config.contact_phone || defaultConfig.contact_phone).replace(/\D/g, '');
                callLink.href = `tel:+${phoneForCall}`;
            }
            if (whatsappLink) {
                const phoneForWhatsapp = (config.contact_phone || defaultConfig.contact_phone).replace(/\D/g, '');
                whatsappLink.href = `https://wa.me/${phoneForWhatsapp}?text=Hi%2C%20I%20need%20shipping%20information`;
            }
            
            document.documentElement.style.setProperty('--bg-color', config.background_color || defaultConfig.background_color);
            document.documentElement.style.setProperty('--primary-color', config.primary_color || defaultConfig.primary_color);
            document.documentElement.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
            
            const fontFamily = config.font_family || defaultConfig.font_family;
            document.body.style.fontFamily = `${fontFamily}, sans-serif`;
            
            const deliveriesEl = document.getElementById('counter-deliveries');
            const citiesEl = document.getElementById('counter-cities');
            if (deliveriesEl) {
                deliveriesEl.textContent = (config.stats_deliveries || defaultConfig.stats_deliveries).replace(/\D/g, '').substring(0, 2);
            }
            if (citiesEl) {
                citiesEl.textContent = (config.stats_cities || defaultConfig.stats_cities).replace(/\D/g, '').substring(0, 3);
            }
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
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
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

// --- Tracking Input Restriction (NUMBER ONLY) ---
const trackingInput = document.getElementById('tracking-input');
if (trackingInput) {
    trackingInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// --- Tracking functionality (API Placeholder) ---
const trackBtn = document.getElementById('track-btn');
const trackingResult = document.getElementById('tracking-result');

if (trackBtn) {
    trackBtn.addEventListener('click', () => {
        const trackingNumber = trackingInput.value.trim();
        if (trackingNumber) {
            trackBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span class="hidden sm:inline">Searching...</span>';
            trackBtn.disabled = true;
            lucide.createIcons();
            
            setTimeout(() => {
                trackingResult.classList.remove('hidden');
                trackBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> <span class="hidden sm:inline">Track Now</span>';
                trackBtn.disabled = false;
                
                // Show Status Tab
                if (tabStatus) {
                    tabStatus.classList.remove('hidden');
                    tabStatus.click();
                }

                // Placeholder Status Content
                if (statusContent) {
                    statusContent.innerHTML = `
                        <div class="flex flex-col items-center justify-center py-10 text-center">
                            <div class="bg-royal-50 p-4 rounded-full mb-4">
                                <i data-lucide="database" class="w-10 h-10 text-royal-600 animate-pulse"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-900">Inquiry for ID: ${trackingNumber}</h3>
                            <p class="text-gray-500 max-w-xs mx-auto mt-2">Connecting to FlyBird live servers... Detailed tracking will be visible once the shipment is processed in our system.</p>
                        </div>
                    `;
                }
                lucide.createIcons();
            }, 1500);
        }
    });
}

const quoteForm = document.getElementById('quote-form');
const phoneInput = document.getElementById('quote-phone');
const phoneError = document.getElementById('phone-error');

if (quoteForm && phoneInput) {
    // 1. +91 fix karne aur sirf 10 digits allow karne ke liye logic
    phoneInput.addEventListener('input', function() {
        // Hamesha check karo ki '+91 ' shuruat mein rahe
        if (!this.value.startsWith('+91 ')) {
            this.value = '+91 ';
        }

        // Sirf numbers allow karo +91 ke baad
        let currentNumber = this.value.substring(4); 
        let sanitizedNumber = currentNumber.replace(/[^0-9]/g, ''); // Sirf 0-9 digits
        
        // 10 digits se zyada na hone do
        if (sanitizedNumber.length > 10) {
            sanitizedNumber = sanitizedNumber.slice(0, 10);
        }
        
        this.value = '+91 ' + sanitizedNumber;
    });

    // Cursor position fix taaki user +91 ke beech mein na likh sake
    phoneInput.addEventListener('click', function() {
        if (this.selectionStart < 4) {
            this.setSelectionRange(4, 4);
        }
    });

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullValue = phoneInput.value.trim();
        const actualNumber = fullValue.substring(4); // '+91 ' ke baad ke 10 digits nikalo
        
        // 2. 10 Digit Validation Check (Sirf actual number ki length check hogi)
        if (actualNumber.length !== 10) {
            // Border red karo aur error dikhao
            phoneInput.classList.add('border-red-500');
            phoneInput.classList.remove('border-gray-200');
            phoneError.classList.remove('hidden');
            return; // Form submit nahi hone dega
        } else {
            // Agar sahi hai toh error hatao
            phoneInput.classList.remove('border-red-500');
            phoneInput.classList.add('border-gray-200');
            phoneError.classList.add('hidden');
        }

        // --- EmailJS Sending Logic ---
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
        submitBtn.disabled = true;
        if (typeof fixIcons === 'function') fixIcons(); // Icons refresh karne ke liye

        const templateParams = {
            name: quoteForm.querySelector('input[placeholder="John Doe"]').value,
            email: quoteForm.querySelector('input[type="email"]').value,
            phone: fullValue, // Poora number +91 ke saath jayega
            service: quoteForm.querySelector('select').value,
            message: quoteForm.querySelector('textarea').value,
            title: "New Inquiry from FlyBird Website"
        };

        emailjs.send('service_s02gw6j', 'template_22kzrzf', templateParams)
            .then(() => {
                quoteForm.reset();
                phoneInput.value = '+91 '; // Reset ke baad +91 wapas dalo
                document.getElementById('form-success').classList.remove('hidden');
                submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Request';
                submitBtn.disabled = false;
                if (typeof fixIcons === 'function') fixIcons();
                setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000);
            }, (error) => {
                alert("Opps! Kuch gadbad ho gayi.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Request';
                if (typeof fixIcons === 'function') fixIcons();
            });
    });
}

// --- NEWSLETTER FORM ---
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i>';
        fixIcons();
        input.value = '';
        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="arrow-right" class="w-5 h-5"></i>';
            fixIcons();
        }, 2000);
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

// --- FINAL ICON PROTECTION ---
window.addEventListener('load', fixIcons);
setTimeout(fixIcons, 1000);