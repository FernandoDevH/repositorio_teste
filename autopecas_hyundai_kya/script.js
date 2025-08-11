/* ========================================
   SCRIPT JAVASCRIPT - AUTOPEÇAS HYUNDAI KIA BH
   Arquivo responsável por todas as funcionalidades interativas do site
   ======================================== */

/* ========================================
   NAVEGAÇÃO MOBILE - MENU HAMBÚRGUER
   ======================================== */

/**
 * Inicialização do menu mobile quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona elementos do menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Adiciona evento de clique no botão hambúrguer
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Alterna a classe 'active' no menu
            navMenu.classList.toggle('active');
            
            // Anima as barras do hambúrguer
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    // Transforma em X
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    // Volta ao estado normal
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Fecha o menu ao clicar em um link (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Reseta as barras do hambúrguer
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
    
    // Inicializa outras funcionalidades
    initScrollAnimations();
    initContactForm();
    initStatCounters();
});

/* ========================================
   FUNCIONALIDADE DO ACCORDION (MENU SANFONADO)
   ======================================== */

/**
 * Função para alternar a abertura/fechamento dos itens do accordion
 * Utilizada na seção de análise de concorrentes para organizar o conteúdo
 * @param {HTMLElement} element - O elemento header clicado (cabeçalho do accordion)
 */
function toggleAccordion(element) {
    // Obtém o item pai do accordion (div que contém header + content)
    const accordionItem = element.parentElement;
    
    // Verifica se o item atual já está ativo (aberto)
    const isActive = accordionItem.classList.contains('active');
    
    // Fecha todos os itens do accordion antes de abrir o selecionado
    // Isso garante que apenas um item fique aberto por vez
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o item clicado apenas se não estava ativo anteriormente
    // Se já estava aberto, permanece fechado (comportamento toggle)
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

/* ========================================
   SCROLL SUAVE PARA NAVEGAÇÃO ÂNCORA
   ======================================== */

/**
 * Implementa scroll suave para todos os links âncora da página
 * Melhora a experiência de navegação entre seções
 */

// Seleciona todos os links que começam com "#" (links âncora)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        
        // Obtém o ID da seção de destino
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Verifica se a seção existe antes de fazer o scroll
        if (targetSection) {
            // Calcula a posição considerando o header fixo
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            // Executa o scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   ANIMAÇÕES DE SCROLL
   ======================================== */

/**
 * Inicializa animações que são ativadas durante o scroll
 */
function initScrollAnimations() {
    // Observador de interseção para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplica animação a elementos específicos
    const animatedElements = document.querySelectorAll('.content-item, .suggestion-item, .strategy-item, .target-item, .value-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ========================================
   CONTADORES ANIMADOS DAS ESTATÍSTICAS
   ======================================== */

/**
 * Inicializa os contadores animados na seção hero
 */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = prefix + Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        };
        
        updateCounter();
    };
    
    // Observador para iniciar animação quando a seção hero estiver visível
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                animateCounter(statNumber);
                counterObserver.unobserve(statNumber); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

/* ========================================
   FORMULÁRIO DE CONTATO
   ======================================== */

/**
 * Inicializa o formulário de contato com validação e envio
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Validação básica
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simula envio do formulário
            showNotification('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpa o formulário
            contactForm.reset();
            
            // Em um ambiente real, aqui seria feita a integração com um serviço de email
            // ou API para processar o formulário
        });
    }
}

/* ========================================
   SISTEMA DE NOTIFICAÇÕES
   ======================================== */

/**
 * Exibe notificações para o usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Remove notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adiciona estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Adiciona ao DOM
    document.body.appendChild(notification);
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Adiciona evento de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ========================================
   EFEITOS DE HOVER E INTERATIVIDADE
   ======================================== */

/**
 * Adiciona efeitos de hover personalizados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de paralaxe sutil no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Efeito de hover nos cards
    const cards = document.querySelectorAll('.content-item, .suggestion-item, .strategy-item, .target-item, .value-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

/* ========================================
   INTEGRAÇÃO COM WHATSAPP
   ======================================== */

/**
 * Funcionalidade para o botão flutuante do WhatsApp
 */
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Adiciona animação de pulso
        setInterval(() => {
            whatsappButton.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                whatsappButton.style.animation = '';
            }, 1000);
        }, 5000);
        
        // Adiciona evento de clique com tracking (opcional)
        whatsappButton.addEventListener('click', function() {
            // Aqui pode ser adicionado tracking de conversão
            console.log('WhatsApp button clicked');
        });
    }
});

/* ========================================
   OTIMIZAÇÕES DE PERFORMANCE
   ======================================== */

/**
 * Lazy loading para imagens (quando implementadas)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ========================================
   ANALYTICS E TRACKING (PLACEHOLDER)
   ======================================== */

/**
 * Funções para tracking de eventos (a serem implementadas conforme necessário)
 */
function trackEvent(eventName, eventData = {}) {
    // Placeholder para integração com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Exemplo de implementação:
    // gtag('event', eventName, eventData);
    // fbq('track', eventName, eventData);
}

// Tracking de cliques em CTAs
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });
});

/* ========================================
   CSS ADICIONAL VIA JAVASCRIPT
   ======================================== */

// Adiciona estilos para animação de pulso do WhatsApp
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

