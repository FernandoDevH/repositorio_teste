/* ========================================
   SCRIPT JAVASCRIPT - @LINKPSICOLOGIA
   Arquivo responsável por todas as funcionalidades interativas do site
   ======================================== */

/* ========================================
   NAVEGAÇÃO MOBILE - MENU HAMBÚRGUER
   ======================================== */

/**
 * Funcionalidade do menu mobile responsivo
 * Controla a abertura e fechamento do menu hambúrguer em dispositivos móveis
 */

// Seleção dos elementos do menu mobile usando getElementById para melhor performance
const navToggle = document.getElementById('nav-toggle'); // Botão hambúrguer (3 barras)
const navMenu = document.getElementById('nav-menu'); // Menu de navegação principal

// Event listener para o botão hambúrguer - Executa quando o botão é clicado
navToggle.addEventListener('click', () => {
    // Alterna as classes CSS para mostrar/esconder o menu
    // A classe 'active' controla a visibilidade e animação do menu
    navMenu.classList.toggle('active'); // Mostra/esconde o menu
    navToggle.classList.toggle('active'); // Anima o botão hambúrguer (transforma em X)
});

// Fecha o menu mobile automaticamente quando um link de navegação é clicado
// Isso melhora a experiência do usuário em dispositivos móveis
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Remove as classes 'active' para fechar o menu e resetar o botão
        navMenu.classList.remove('active'); // Esconde o menu
        navToggle.classList.remove('active'); // Volta o botão ao estado normal (3 barras)
    });
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
        
        // Encontra o elemento de destino usando o href do link
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Calcula a posição considerando a altura do header fixo
            const headerOffset = 80; // Altura do header fixo em pixels
            const elementPosition = target.offsetTop; // Posição do elemento na página
            const offsetPosition = elementPosition - headerOffset; // Posição ajustada

            // Executa o scroll suave até a posição calculada
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' // Animação suave do scroll
            });
        }
    });
});

/* ========================================
   DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO
   ======================================== */

/**
 * Sistema de navegação ativa que destaca o link correspondente à seção visível
 * Monitora o scroll da página e atualiza o menu de navegação
 */

// Monitora o evento de scroll da janela
window.addEventListener('scroll', () => {
    // Seleciona todas as seções que possuem ID (seções navegáveis)
    const sections = document.querySelectorAll('section[id]');
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = ''; // Variável para armazenar a seção atual
    
    // Verifica qual seção está visível na tela
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Posição do topo da seção
        const sectionHeight = section.clientHeight; // Altura da seção
        
        // Se a posição do scroll está dentro da seção (com margem de 200px)
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id'); // Define como seção atual
        }
    });

    // Atualiza os links de navegação com base na seção atual
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove classe ativa de todos os links
        
        // Adiciona classe ativa ao link correspondente à seção atual
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
   ======================================== */

/**
 * Sistema de animações que ativa quando elementos entram na viewport
 * Utiliza Intersection Observer API para melhor performance
 */

// Configurações do observer para controlar quando as animações são ativadas
const observerOptions = {
    threshold: 0.1, // Ativa quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px' // Margem inferior de 50px para ativação antecipada
};

// Cria o observer que monitora quando elementos entram na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se o elemento está intersectando (visível na tela)
        if (entry.isIntersecting) {
            // Adiciona a classe de animação fade-in
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Inicia a observação dos elementos quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos que devem ter animação de entrada
    const animateElements = document.querySelectorAll('.content-card, .funnel-stage, .differential-item, .proposal-card, .accordion-item');
    
    // Adiciona cada elemento à lista de observação
    animateElements.forEach(el => observer.observe(el));
});

/* ========================================
   EFEITO DINÂMICO NO HEADER DURANTE SCROLL
   ======================================== */

/**
 * Altera a aparência do header conforme o usuário faz scroll
 * Aumenta a opacidade do fundo para melhor legibilidade
 */

// Monitora o scroll para ajustar o header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    // Se o usuário rolou mais de 100px da página
    if (window.scrollY > 100) {
        // Aumenta a opacidade do fundo do header
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        // Mantém a opacidade padrão quando no topo
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

/* ========================================
   ANIMAÇÃO DE CONTADORES NUMÉRICOS
   ======================================== */

/**
 * Anima contadores numéricos de 0 até o valor alvo
 * Utilizado na seção hero para animar as estatísticas
 * @param {HTMLElement} element - Elemento que exibirá o contador
 * @param {number} target - Valor final do contador
 * @param {number} duration - Duração da animação em milissegundos (padrão: 2000ms)
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0; // Valor inicial do contador
    const increment = target / (duration / 16); // Incremento por frame (60fps)
    
    // Timer que executa a cada 16ms (aproximadamente 60fps)
    const timer = setInterval(() => {
        start += increment; // Incrementa o valor
        
        if (start >= target) {
            // Se atingiu o valor alvo, para a animação
            element.textContent = target;
            clearInterval(timer);
        } else {
            // Atualiza o texto com o valor atual (arredondado)
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observer específico para animar contadores na seção hero
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Seleciona todos os números das estatísticas
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                
                // Anima diferentes tipos de estatísticas
                if (text === '17') {
                    // Anima o número de anos de experiência
                    animateCounter(stat, 17);
                } else if (text === 'R$ 800') {
                    // Mantém o texto original para valores monetários
                    stat.textContent = 'R$ 800';
                } else if (text === '40k') {
                    // Anima o alcance e adiciona 'k' após a animação
                    animateCounter(stat, 40);
                    setTimeout(() => {
                        stat.textContent = '40k'; // Adiciona o 'k' após 2 segundos
                    }, 2000);
                }
            });
            
            // Para de observar após animar (executa apenas uma vez)
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Ativa quando 50% da seção hero está visível

// Inicia a observação da seção hero quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

/* ========================================
   EFEITOS HOVER DINÂMICOS NOS CARDS
   ======================================== */

/**
 * Adiciona efeitos hover dinâmicos aos cards para melhor interatividade
 * Cria uma experiência mais rica para o usuário
 */

// Executa quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cards que devem ter efeito hover
    const cards = document.querySelectorAll('.content-item, .differential-item, .funnel-stage');
    
    cards.forEach(card => {
        // Efeito quando o mouse entra no card
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)'; // Move o card para cima
            card.style.transition = 'transform 0.3s ease'; // Transição suave
        });
        
        // Efeito quando o mouse sai do card
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)'; // Retorna à posição original
        });
    });
});

/* ========================================
   EFEITO PARALLAX SUTIL NO HERO
   ======================================== */

/**
 * Adiciona efeito parallax sutil na seção hero
 * Cria profundidade visual durante o scroll
 */

// Monitora o scroll para aplicar efeito parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset; // Posição atual do scroll
    const hero = document.querySelector('.hero'); // Seção hero
    
    if (hero) {
        // Calcula o deslocamento parallax (movimento mais lento que o scroll)
        const rate = scrolled * -0.5; // Velocidade do parallax (50% do scroll)
        hero.style.transform = `translateY(${rate}px)`; // Aplica o deslocamento
    }
});

/* ========================================
   ANIMAÇÃO DE CARREGAMENTO DA PÁGINA
   ======================================== */

/**
 * Remove a animação de loading quando a página carrega completamente
 * Melhora a percepção de performance do site
 */

// Executa quando todos os recursos da página foram carregados
window.addEventListener('load', () => {
    document.body.classList.add('loaded'); // Adiciona classe que remove o loading
});

/* ========================================
   ESTILOS CSS DINÂMICOS VIA JAVASCRIPT
   ======================================== */

/**
 * Adiciona estilos CSS dinamicamente via JavaScript
 * Útil para estilos que dependem de interações JavaScript
 */

// Cria um elemento style e adiciona ao head
const style = document.createElement('style');
style.textContent = `
    /* Estilo para link ativo na navegação - Aplicado dinamicamente */
    .nav-link.active {
        color: #2563eb !important; /* Cor azul para link ativo */
    }
    
    /* Linha indicadora para link ativo */
    .nav-link.active::after {
        width: 100% !important; /* Linha completa sob o link ativo */
    }
    
    /* Animação de carregamento da página */
    body.loaded {
        opacity: 1; /* Página totalmente visível após carregamento */
    }
    
    /* Estado inicial da página (invisível) */
    body {
        opacity: 0; /* Página invisível inicialmente */
        transition: opacity 0.3s ease; /* Transição suave para visibilidade */
    }
`;

// Adiciona os estilos ao head do documento
document.head.appendChild(style);

