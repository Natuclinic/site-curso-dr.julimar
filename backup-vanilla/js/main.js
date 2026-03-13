document.addEventListener('DOMContentLoaded', () => {

    // ─── Scroll Animations (Intersection Observer) ──────────────────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ─── Navbar scroll effect ────────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ─── Animated particles ──────────────────────────────────────────────────
    const particlesContainer = document.getElementById('particles');
    const PARTICLE_COUNT = 25;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        createParticle();
    }

    function createParticle() {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 15;

        p.style.cssText = `
            width: \${size}px;
            height: \${size}px;
            left: \${left}%;
            animation-duration: \${duration}s;
            animation-delay: -\${delay}s;
        `;

        particlesContainer.appendChild(p);
    }

    // ─── Smooth hero entrance ────────────────────────────────────────────────
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }

    // ─── GlareHover logic ────────────────────────────────────────────────────
    const glareButtons = document.querySelectorAll('.btn--glare');
    glareButtons.forEach(btn => {
        const glare = btn.querySelector('.glare');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glare.style.left = `\${x}px`;
            glare.style.top = `\${y}px`;
        });
    });

    // ─── Simulated Purchase Notifications ─────────────────────────────────────
    const notificationContainer = document.getElementById('notification-container');
    const names = [
        'Ana Souza', 'Marcos Pereira', 'Juliana Lima', 'Rodrigo Gomes', 'Fernanda Silva',
        'Gabriel Oliveira', 'Carla Ramos', 'Paulo Batista', 'Beatriz Costa', 'Lucas Mendes',
        'Patrícia Santos', 'Renato Alves', 'Aline Ferreira', 'André Luiz Costa', 'Bruna Rodrigues',
        'Cláudio Roberto Silva', 'Daniela Nunes', 'Eduardo Paiva', 'Elaine Moreira', 'Ricardo Moraes',
        'Giovanna Porto', 'Heitor J. Silva', 'Iara Lopes', 'João Pedro Santos', 'Kelly Cristina',
        'Leonardo Farias', 'Márcia Regina', 'Nailton José', 'Otávio Martins', 'Priscila Soares',
        'Quintino Gomes', 'Rafaela Silva', 'Sandro Rocha', 'Tatiana Nunes', 'Ubiratan Lima',
        'Vanessa Lima', 'Wagner Antunes', 'Larissa Cavalcante', 'Yago Souza', 'Mateus Silva',
        'Zilda Maria', 'Vitor Hugo Souza', 'Alice Cardoso', 'Bernardo Silva', 'Carlos Eduardo',
        'Cátia Santos', 'Roberto Dantas', 'Fabiana Silva', 'Graziela Mendes', 'Hugo Ramos',
        'Isabela Vasconcelos', 'Jorge Pereira', 'Kleber Silva', 'Luiz Antônio', 'Maria das Graças',
        'Nelson Rocha', 'Osmar Magalhães', 'Paula Gomes', 'Ricardo Vieira', 'Sônia Maria',
        'Taís Regina', 'Ulisses Souza', 'Vera Lúcia', 'Wendel Martins', 'Yasmin Souza'
    ];
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Brasília, DF', 'Curitiba, PR', 'Belo Horizonte, MG', 'Salvador, BA', 'Goiânia, GO', 'Porto Alegre, RS', 'Recife, PE', 'Fortaleza, CE'];
    const products = ['acabou de garantir o seu acesso', 'garantiu acesso ao curso agora', 'acabou de garantir a sua vaga'];

    function showNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <div class="notification-content">
                <strong>\${name}</strong>
                <span>\${product}</span>
                <span class="notification-time">HÁ ALGUNS SEGUNDOS • \${city}</span>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after a few seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 6000);

        // Schedule next notification (between 25 and 55 seconds)
        const nextDelay = Math.floor(Math.random() * (55000 - 25000 + 1)) + 25000;
        setTimeout(showNotification, nextDelay);
    }

    // Start notifications after a short initial delay
    setTimeout(showNotification, 10000);

    // ─── Vagas Indicator Animation ───────────────────────────────────────────
    const vagasPercent = document.getElementById('vagas-percent');
    const vagasBar = document.getElementById('vagas-bar-progress');

    if (vagasPercent && vagasBar) {
        setTimeout(() => {
            const startValue = 75;
            const endValue = 79;
            const duration = 3000; // Match CSS transition
            
            // Animate bar width
            vagasBar.style.width = `\${endValue}%`;
            
            // Animate percentage text
            let current = startValue;
            const interval = duration / (endValue - startValue);
            
            const counter = setInterval(() => {
                current++;
                vagasPercent.textContent = `\${current}%`;
                if (current >= endValue) clearInterval(counter);
            }, interval);
            
        }, 2000); // 2 second delay before starting
    }

});


    // --- FAQ Accordion -------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

/**
 * Dynamic Noise Implementation (Vanilla JS)
 * Replicated from requested React Component logic
 */
function initDynamicNoise() {
    const canvas = document.getElementById('noise-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId;
    const canvasSize = 1024; // Increased for a much finer grain texture
    
    // Config from usage example: patternAlpha=5, patternRefreshInterval=2
    const patternRefreshInterval = 2;
    const patternAlpha = 8; // Slightly increased for visibility on dark theme

    const resize = () => {
        canvas.width = canvasSize;
        canvas.height = canvasSize;
    };

    const drawGrain = () => {
        const imageData = ctx.createImageData(canvasSize, canvasSize);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = patternAlpha;
        }

        ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
        if (frame % patternRefreshInterval === 0) {
            drawGrain();
        }
        frame++;
        animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();
}

// Ensure the noise starts when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicNoise);
} else {
    initDynamicNoise();
}
