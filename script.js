
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            royal: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a'
            },
            accent: {
              400: '#fb923c',
              500: '#f97316',
              600: '#ea580c'
            }
          }
        }
      }
    }

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
        bgElement.style.opacity = '0.7'; // Smooth transition ke liye fade
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            bgElement.style.backgroundImage = `url('${images[currentIndex]}')`;
            bgElement.style.opacity = '1';
        }, 800);
    }
}

if (bgElement) {
    bgElement.style.transition = 'opacity 1s ease-in-out';
    setInterval(changeBackground, 5000); // Har 5 second mein change
}


    // Initialize Lucide icons
    lucide.createIcons();
    
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
          // Update hero title
          const heroTitle = document.getElementById('hero-title');
          if (heroTitle) heroTitle.innerHTML = config.hero_title || defaultConfig.hero_title;
          
          // Update hero subtitle
          const heroSubtitle = document.getElementById('hero-subtitle');
          if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;

          // Update tracking placeholder
          const trackingInput = document.getElementById('tracking-input');
          if (trackingInput) trackingInput.placeholder = config.tracking_placeholder || defaultConfig.tracking_placeholder;
          
          // Update services title
          const servicesTitle = document.getElementById('services-title');
          if (servicesTitle) servicesTitle.textContent = config.services_title || defaultConfig.services_title;
          
          // Update contact title
          const contactTitle = document.getElementById('contact-title');
          if (contactTitle) contactTitle.textContent = config.contact_title || defaultConfig.contact_title;

          // Update contact email
          const contactEmailDisplay = document.getElementById('contact-email-display');
          const emailLink = document.getElementById('email-link');
          if (contactEmailDisplay) contactEmailDisplay.textContent = config.contact_email || defaultConfig.contact_email;
          if (emailLink) emailLink.href = `mailto:${config.contact_email || defaultConfig.contact_email}`;

          // Update contact phone
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
          
          // Apply colors
          document.documentElement.style.setProperty('--bg-color', config.background_color || defaultConfig.background_color);
          document.documentElement.style.setProperty('--primary-color', config.primary_color || defaultConfig.primary_color);
          document.documentElement.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
          
          // Apply font
          const fontFamily = config.font_family || defaultConfig.font_family;
          document.body.style.fontFamily = `${fontFamily}, sans-serif`;
          
          // Update counter stats
          const deliveriesEl = document.getElementById('counter-deliveries');
          const citiesEl = document.getElementById('counter-cities');
          if (deliveriesEl) {
            deliveriesEl.textContent = (config.stats_deliveries || defaultConfig.stats_deliveries).replace(/\D/g, '').substring(0, 2);
          }
          if (citiesEl) {
            citiesEl.textContent = (config.stats_cities || defaultConfig.stats_cities).replace(/\D/g, '').substring(0, 3);
          }
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => window.elementSdk.setConfig({ background_color: value })
            },
            {
              get: () => config.primary_color || defaultConfig.primary_color,
              set: (value) => window.elementSdk.setConfig({ primary_color: value })
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => window.elementSdk.setConfig({ text_color: value })
            },
            {
              get: () => config.accent_color || defaultConfig.accent_color,
              set: (value) => window.elementSdk.setConfig({ accent_color: value })
            },
            {
              get: () => config.secondary_color || defaultConfig.secondary_color,
              set: (value) => window.elementSdk.setConfig({ secondary_color: value })
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => window.elementSdk.setConfig({ font_family: value })
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => window.elementSdk.setConfig({ font_size: value })
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['hero_title', config.hero_title || defaultConfig.hero_title],
          ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
          ['tracking_placeholder', config.tracking_placeholder || defaultConfig.tracking_placeholder],
          ['services_title', config.services_title || defaultConfig.services_title],
          ['contact_title', config.contact_title || defaultConfig.contact_title],
          ['contact_email', config.contact_email || defaultConfig.contact_email],
          ['contact_phone', config.contact_phone || defaultConfig.contact_phone],
          ['stats_deliveries', config.stats_deliveries || defaultConfig.stats_deliveries],
          ['stats_cities', config.stats_cities || defaultConfig.stats_cities]
        ])
      });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Tab switching for tracking
    const tabTrack = document.getElementById('tab-track');
    const tabStatus = document.getElementById('tab-status');
    const trackContent = document.getElementById('track-content');
    const statusContent = document.getElementById('status-content');

    tabTrack.addEventListener('click', () => {
      tabTrack.classList.add('active');
      tabStatus.classList.remove('active');
      trackContent.classList.remove('hidden');
      statusContent.classList.add('hidden');
    });

    tabStatus.addEventListener('click', () => {
      tabStatus.classList.add('active');
      tabTrack.classList.remove('active');
      statusContent.classList.remove('hidden');
      trackContent.classList.add('hidden');
    });
    
    // Tracking functionality
    const trackBtn = document.getElementById('track-btn');
    const trackingInput = document.getElementById('tracking-input');
    const trackingResult = document.getElementById('tracking-result');
    
    trackBtn.addEventListener('click', () => {
      const trackingNumber = trackingInput.value.trim();
      if (trackingNumber) {
        trackBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span class="hidden sm:inline">Tracking...</span>';
        trackBtn.disabled = true;
        
       setTimeout(() => {
          trackingResult.classList.remove('hidden');
          trackBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> <span class="hidden sm:inline">Track Now</span>';
          trackBtn.disabled = false;
          
          // 1. Live Status tab ko active dikhao
          tabStatus.classList.remove('hidden'); 
          tabStatus.click(); // Isse active class add hogi

          // 2. IMPORTANT: Status content ko manually show karo aur Track content ko hide karo
          document.getElementById('status-content').classList.remove('hidden');
          document.getElementById('track-content').classList.add('hidden');

          lucide.createIcons();
        }, 1500);
      }
    });
    
    trackingInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        trackBtn.click();
      }
    });
    
    // Quote form submission
    const quoteForm = document.getElementById('quote-form');
    const formSuccess = document.getElementById('form-success');
    
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        quoteForm.reset();
        formSuccess.classList.remove('hidden');
        submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Request';
        submitBtn.disabled = false;
        lucide.createIcons();
        
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }, 2000);
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      
      btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i>';
      lucide.createIcons();
      input.value = '';
      
      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="arrow-right" class="w-5 h-5"></i>';
        lucide.createIcons();
      }, 2000);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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
    
    // Counter animation on scroll
    function animateCounters() {
      const counters = [
        { el: document.getElementById('counter-deliveries'), target: parseInt(defaultConfig.stats_deliveries) / 100, duration: 2000 },
        { el: document.getElementById('counter-cities'), target: parseInt(defaultConfig.stats_cities) / 100, duration: 2000 }
      ];
      
      const startTime = Date.now();
      
      counters.forEach(counter => {
        if (!counter.el) return;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / counter.duration, 1);
          const current = Math.floor(counter.target * progress);
          counter.el.textContent = current;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      });
    }
    
    // Trigger counter animation when section becomes visible
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
// Saare icons ko load hone par wapas laane ke liye
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// WhatsApp aur baaki icons ko wapas lane ke liye
function fixIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Page load hote hi aur 1 second ke delay ke baad dono baar chala do
window.addEventListener('load', fixIcons);
setTimeout(fixIcons, 1000);