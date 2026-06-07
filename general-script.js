// Wait for the DOM to fully load before running the scripts
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const navLinks = document.getElementById('nav-links');

  // Verify elements exist to prevent console errors
  if (menuToggle && menuClose && navLinks) {
    // Slide open the drawer panel
    menuToggle.addEventListener('click', () => {
      navLinks.classList.add('show');
    });

    // Slide closed the drawer panel
    menuClose.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  }
});

/* ==========================================================================
   SCROLL REVEAL ENTRY ANIMATIONS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    hiddenElements.forEach(element => appearanceObserver.observe(element));
});

/* ==========================================================================
   SCROLL REVEAL ENTRY ANIMATIONS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    hiddenElements.forEach(element => appearanceObserver.observe(element));
});


/* ==========================================================================
   STATISTICS COUNTER TICK ANIMATION
   ========================================================================== */
const animateStatsCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const trackingDuration = 1500; // Animation speed window in milliseconds

    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10);
        const baselineValue = 0;
        let runningTimestamp = null;

        const updateCounterValue = (currentTimestamp) => {
            if (!runningTimestamp) runningTimestamp = currentTimestamp;
            const elapsedTime = currentTimestamp - runningTimestamp;
            
            // Linear progression mapping calculation
            const continuousProgress = Math.min(elapsedTime / trackingDuration, 1);
            const intermediateValue = Math.floor(continuousProgress * (targetValue - baselineValue) + baselineValue);

            // Format numbers nicely with commas for values over 999
            counter.textContent = intermediateValue.toLocaleString();

            if (continuousProgress < 1) {
                requestAnimationFrame(updateCounterValue);
            } else {
                counter.textContent = targetValue.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounterValue);
    });
};

// Hook into the IntersectionObserver you already set up for smooth styling reveals
document.addEventListener("DOMContentLoaded", () => {
    const targetStatsSection = document.querySelector('.stats-bar-section');
    if (!targetStatsSection) return;

    const statsRunObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    statsRunObserver.observe(targetStatsSection);
});