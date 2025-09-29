// Modern JavaScript for Asymm Music Festival Website

// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');
const scheduleTabs = document.querySelectorAll('.schedule-tab');
const scheduleDays = document.querySelectorAll('.schedule-day');
const artistCards = document.querySelectorAll('.artist-card');
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCountdownTimer();
    initializeScheduleTabs();
    initializeArtistCards();
    initializeSmoothScrolling();
    initializeAccessibility();
    preloadImages();
});

// Navigation functionality
function initializeNavigation() {
    if (menuBtn && menu && menuOpenIcon && menuCloseIcon) {
        menuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        document.querySelectorAll('#menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    menu.classList.toggle('hidden');
    menuOpenIcon.classList.toggle('hidden');
    menuCloseIcon.classList.toggle('hidden');
}

function closeMobileMenu() {
    menu.classList.add('hidden');
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
}

// Countdown Timer functionality
function initializeCountdownTimer() {
    // Set the target date (you can change this to your festival date)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 94);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        if (distance < 0) {
            // Countdown finished
            const countdownContainer = document.getElementById('countdown');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div class="col-span-4 text-3xl font-bold text-purple-300 text-center">
                        THE TIME IS NOW
                    </div>
                `;
            }
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        if (countdownElements.days) countdownElements.days.textContent = days.toString().padStart(2, '0');
        if (countdownElements.hours) countdownElements.hours.textContent = hours.toString().padStart(2, '0');
        if (countdownElements.minutes) countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
        if (countdownElements.seconds) countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

// Schedule tabs functionality
function initializeScheduleTabs() {
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // Remove active class from all tabs and days
            scheduleTabs.forEach(t => {
                t.classList.remove('active', 'bg-purple-400', 'text-white');
                t.classList.add('text-purple-300');
            });
            scheduleDays.forEach(d => d.classList.add('hidden'));
            
            // Add active class to clicked tab and corresponding day
            this.classList.add('active', 'bg-purple-400', 'text-white');
            this.classList.remove('text-purple-300');
            
            const targetDayElement = document.getElementById(targetDay);
            if (targetDayElement) {
                targetDayElement.classList.remove('hidden');
            }
            
            // Add visual feedback
            showNotification(`Switched to ${this.textContent} 📅`);
        });
    });
}

// Artist cards functionality
function initializeArtistCards() {
    artistCards.forEach(card => {
        // Video hover functionality
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', function() {
                video.play().catch(e => console.log('Video play failed:', e));
            });
            
            card.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
        }
        
        // Card click handler
        card.addEventListener('click', function() {
            const artistName = this.querySelector('h3').textContent;
            const artistGenre = this.querySelector('p').textContent;
            const artistStage = this.querySelector('p:last-child').textContent;
            
            showArtistModal({
                name: artistName,
                genre: artistGenre,
                stage: artistStage
            });
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Accessibility features
function initializeAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #8b5cf6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Show artist modal
function showArtistModal(artist) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-purple-400">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-white">${artist.name}</h3>
                <button class="text-gray-400 hover:text-white text-2xl modal-close">&times;</button>
            </div>
            <div class="text-gray-300 space-y-3">
                <p><strong class="text-purple-400">Genre:</strong> ${artist.genre}</p>
                <p><strong class="text-purple-400">Stage:</strong> ${artist.stage}</p>
                <p class="mt-4">Experience the incredible performance of ${artist.name} at this year's Asymm Music Festival. Don't miss out on this amazing musical journey!</p>
            </div>
            <div class="flex gap-3 mt-6">
                <button class="flex-1 px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors">
                    Set Reminder
                </button>
                <button class="flex-1 px-4 py-2 border border-purple-400 text-purple-300 rounded-lg hover:bg-purple-400 hover:text-white transition-colors modal-close">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-purple-400 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'Arrahman.jpg',
        '0c3816e00b901e0b87d83b6885ad0cb4.jpg',
        'Thaikkudam bridge.jpeg',
        'Jonita Gandhi Performing in A R Rahmans US tour 2018.jpeg',
        'Indian Musician - Benny Dayal.jpeg',
        '_ (1).jpeg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.artist-card, .schedule-day, .performance-slot');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});