// Main JS for Landing Page & Hero Interactions
(function() {
    // 1. Mobile Menu Toggle Logic
    const burger = document.getElementById('heroBurger');
    const overlay = document.getElementById('heroMobileOverlay');
    const sheet = document.getElementById('heroMobileSheet');

    function openMobileMenu() {
        if (!burger || !sheet || !overlay) return;
        burger.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        overlay.classList.add('active');
        sheet.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!burger || !sheet || !overlay) return;
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('active');
        sheet.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (burger.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 720) {
            closeMobileMenu();
        }
    });

    // Close on mobile link click
    document.querySelectorAll('.hero-mobile-link, .hero-mobile-signin').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 2. Stats Count-Up Animation
    const stats = [
        { id: 'stat-inf', target: 17, decimals: 0, suffix: '+' },
        { id: 'stat-uptime', target: 100, decimals: 0, suffix: '%' },
        { id: 'stat-runtime', target: 24, decimals: 0, suffix: '/7' },
        { id: 'stat-context', target: 500, decimals: 0, suffix: '+' }
    ];

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateCountUp(el, target, decimals, suffix, duration) {
        const startTime = performance.now();
        const startVal = 0;

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutCubic(progress);
            const current = startVal + (target - startVal) * ease;

            el.textContent = current.toFixed(decimals) + (suffix ? ' ' + suffix : '');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toFixed(decimals) + (suffix ? ' ' + suffix : '');
            }
        }
        requestAnimationFrame(update);
    }

    const statsFooter = document.getElementById('heroStatsFooter');
    if (statsFooter && 'IntersectionObserver' in window) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    stats.forEach((s, i) => {
                        const el = document.getElementById(s.id);
                        if (!el) return;
                        const duration = 1500 + i * 80;
                        const startDelay = 480 + i * 90;
                        setTimeout(() => {
                            animateCountUp(el, s.target, s.decimals, s.suffix, duration);
                        }, startDelay);
                    });
                    observer.unobserve(statsFooter);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(statsFooter);
    }
})();
