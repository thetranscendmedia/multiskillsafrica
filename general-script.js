/* ==========================================================================
   1. MOBILE DRAWER NAVIGATION TRACK ENGINE (With Display Toggle Fix)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && menuClose && navLinks) {
    
    // --- OPEN SLIDE MECHANISM ---
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents event bubbling issues
      
      // 1. Bring the drawer back into the browser's render tree
      navLinks.style.display = 'flex';
      
      // 2. Request an animation frame to let the browser process 'display: flex' 
      //    before triggering the CSS transition transform slide
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navLinks.classList.add('show');
        });
      });
    });

    // --- CLOSE SLIDE MECHANISM ---
    menuClose.addEventListener('click', () => {
      // 1. First, slide it back out of bounds safely
      navLinks.classList.remove('show');
      
      // 2. Wait exactly 300ms (matching your CSS transition time) then strip it from layout
      setTimeout(() => {
        // Double check the user didn't instantly try to re-open it during the transition
        if (!navLinks.classList.contains('show')) {
          navLinks.style.display = 'none';
        }
      }, 300);
    });

    // --- ACCESSIBILITY SAFETY NET: CLICK OUTSIDE TO CLOSE ---
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        setTimeout(() => {
          if (!navLinks.classList.contains('show')) {
            navLinks.style.display = 'none';
          }
        }, 300);
      }
    });
  }
});

/* ==========================================================================
   2. SCROLL REVEAL ENTRY ANIMATIONS (Consolidated Loop)
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
   3. STATISTICS COUNTER TICK ANIMATION
   ========================================================================== */
const animateStatsCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const trackingDuration = 1500;

  counters.forEach(counter => {
    const targetValue = parseInt(counter.getAttribute('data-target'), 10);
    const baselineValue = 0;
    let runningTimestamp = null;

    const updateCounterValue = (currentTimestamp) => {
      if (!runningTimestamp) runningTimestamp = currentTimestamp;
      const elapsedTime = currentTimestamp - runningTimestamp;
      
      const continuousProgress = Math.min(elapsedTime / trackingDuration, 1);
      const intermediateValue = Math.floor(continuousProgress * (targetValue - baselineValue) + baselineValue);

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

// Intersection Trigger for the statistics bar panel
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