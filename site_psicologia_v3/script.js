/* ========================================
   SCRIPT JAVASCRIPT - @LINKPSICOLOGIA
   ======================================== */

/* ========================================
   NAVEGAÇÃO MOBILE
   ======================================== */

// Seleção dos elementos do menu mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Event listener para o botão hambúrguer
navToggle.addEventListener('click', () => {
    // Alterna as classes para mostrar/esconder o menu
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fecha o menu mobile quando um link é clicado
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

/* ========================================
   FUNCIONALIDADE DO ACCORDION
   ======================================== */

/**
 * Função para alternar a abertura/fechamento dos itens do accordion
 * @param {HTMLElement} element - O elemento header clicado
 */
function toggleAccordion(element) {
    const accordionItem = element.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Fecha todos os itens do accordion
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o item clicado se não estava ativo
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

/* ========================================
   SCROLL SUAVE PARA NAVEGAÇÃO
   ======================================== */

// Adiciona scroll suave para todos os links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Altura do header fixo
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO
   ======================================== */

// Monitora o scroll para destacar o link ativo
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    // Verifica qual seção está visível
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Remove a classe active de todos os links e adiciona ao atual
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
   ======================================== */

// Configurações do observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer para adicionar animações quando elementos entram na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observa elementos para animação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.content-card, .funnel-stage, .differential-item, .proposal-card, .accordion-item');
    animateElements.forEach(el => observer.observe(el));
});

/* ========================================
   EFEITO NO HEADER DURANTE SCROLL
   ======================================== */

// Altera a opacidade do header conforme o scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

/* ========================================
   ANIMAÇÃO DE CONTADORES
   ======================================== */

/**
 * Anima um contador de 0 até o valor alvo
 * @param {HTMLElement} element - Elemento que exibirá o contador
 * @param {number} target - Valor final do contador
 * @param {number} duration - Duração da animação em ms
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observer específico para animar contadores na seção hero
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text === '17') {
                    animateCounter(stat, 17);
                } else if (text === 'R$ 800') {
                    stat.textContent = 'R$ 800'; // Mantém o texto original
                } else if (text === '40k') {
                    animateCounter(stat, 40);
                    setTimeout(() => {
                        stat.textContent = '40k'; // Adiciona o 'k' após a animação
                    }, 2000);
                }
            });
            heroObserver.unobserve(entry.target); // Para de observar após animar
        }
    });
}, { threshold: 0.5 });

// Inicia a observação da seção hero quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

/* ========================================
   EFEITOS HOVER NOS CARDS
   ======================================== */

// Adiciona efeitos hover dinâmicos aos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-item, .differential-item, .funnel-stage');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

/* ========================================
   EFEITO PARALLAX NO HERO
   ======================================== */

// Adiciona efeito parallax sutil na seção hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

/* ========================================
   ANIMAÇÃO DE CARREGAMENTO
   ======================================== */

// Remove a animação de loading quando a página carrega completamente
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* ========================================
   ESTILOS CSS DINÂMICOS
   ======================================== */

// Adiciona estilos CSS dinamicamente via JavaScript
const style = document.createElement('style');
style.textContent = `
    /* Estilo para link ativo na navegação */
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* Animação de carregamento da página */
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

