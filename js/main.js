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
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
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
            
            glare.style.left = `${x}px`;
            glare.style.top = `${y}px`;
        });
    });

    // ─── Simulated Purchase Notifications ─────────────────────────────────────
    const notificationContainer = document.getElementById('notification-container');
    const names = [
        'Ana Silva', 'Marcos Oliveira', 'Juliana Costa', 'Rodrigo Santos', 'Fernanda Lima', 
        'Gabriel Souza', 'Carla Mendes', 'Paulo Rocha', 'Beatriz Alves', 'Lucas Ferreira', 
        'Patrícia Gomes', 'Renato Martins', 'Aline Vieira', 'André Luiz', 'Bruna Carvalho', 
        'Cláudio Roberto', 'Daniela Nunes', 'Eduardo Paiva', 'Elaine Santos', 'Felipe Massa', 
        'Gisele Bündchen', 'Heitor Silva', 'Iara Lopes', 'João Pedro', 'Kelly Cristina', 
        'Leonardo Diogo', 'Márcia Regina', 'Nailton José', 'Otávio Mesquita', 'Priscila Fantin', 
        'Quintino Gomes', 'Rafaela Silva', 'Sandro Rocha', 'Tatiana Weston', 'Ubiratan Jovem', 
        'Vanessa Camargo', 'Wagner Moura', 'Xanddy Harmonia', 'Yago Pikachu', 'Zezé Di Camargo',
        'Zilda Arns', 'Vitor Kley', 'Alice Braga', 'Bernardo Silva', 'Caio Castro',
        'Dira Paes', 'Emílio Dantas', 'Fabiana Karla', 'Grazi Massafera', 'Hugo Gloss',
        'Isis Valverde', 'Jorge Ben', 'Kleber Toledo', 'Lázaro Ramos', 'Malu Mader',
        'Ney Latorraca', 'Oscar Magrini', 'Paolla Oliveira', 'Reynaldo Gianecchini', 'Sophie Charlotte',
        'Taís Araújo', 'Ulisses Neves', 'Vera Holtz', 'Wendel Bezerra', 'Yasmim Brunet'
    ];
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Brasília, DF', 'Curitiba, PR', 'Belo Horizonte, MG', 'Salvador, BA', 'Goiânia, GO', 'Porto Alegre, RS', 'Recife, PE', 'Fortaleza, CE'];
    const products = ['acabou de garantir o Plano Completo', 'acabou de se inscrever na Formação Base', 'garantiu acesso à Mentoria de Bastidores', 'acabou de entrar para o Grupo VIP', 'garantiu a Imersão Aloe Vera'];

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
                <strong>${name}</strong>
                <span>${product}</span>
                <span class="notification-time">HÁ ALGUNS SEGUNDOS • ${city}</span>
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
            vagasBar.style.width = `${endValue}%`;
            
            // Animate percentage text
            let current = startValue;
            const interval = duration / (endValue - startValue);
            
            const counter = setInterval(() => {
                current++;
                vagasPercent.textContent = `${current}%`;
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
