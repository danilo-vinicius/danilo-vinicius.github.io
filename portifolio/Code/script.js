document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       0. TEMA CLARO/ESCURO
       ========================================= */
    function loadTheme() {
        const theme = localStorage.getItem('theme');
        const icon = document.getElementById('theme-icon');
        
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if(icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('light-mode');
            if(icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
    
    // Carrega o tema ao iniciar
    loadTheme();

    /* =========================================
       1. TYPEWRITER EFFECT (Efeito de Digitação)
       ========================================= */
    const typeWriterElement = document.querySelector('.typewriter-text');
    
    // Só roda se o elemento de digitação existir na página
    if (typeWriterElement) {
        const phrases = [
            "Ciência de Dados",
            "Business Intelligence",
            "Engenharia de Dados (ETL)",
            "Automação com Python",
            "Análise Preditiva",
            "Dashboards Estratégicos"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pausa lendo
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pausa antes do próximo
            }

            setTimeout(type, typeSpeed);
        }

        // Inicia a função imediatamente
        type();
    }


    /* =========================================
       2. PAGINAÇÃO DINÂMICA (Página Projetos)
       ========================================= */
    const projectContainer = document.getElementById('project-list');
    const paginationContainer = document.getElementById('pagination-controls');

    if (projectContainer && paginationContainer) {
        const cardsPerPage = 3;
        const cards = Array.from(projectContainer.getElementsByClassName('project-card'));

        if (cards.length > cardsPerPage) {
            const totalPages = Math.ceil(cards.length / cardsPerPage);
            let currentPage = 1;

            function displayPage(page) {
                const start = (page - 1) * cardsPerPage;
                const end = start + cardsPerPage;

                cards.forEach((card, index) => {
                    if (index >= start && index < end) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
                updateButtons(page);
            }

            function updateButtons(activePage) {
                paginationContainer.innerHTML = '';
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement('button');
                    btn.innerText = i;
                    btn.classList.add('page-btn');
                    if (i === activePage) btn.classList.add('active');
                    
                    btn.addEventListener('click', () => {
                        currentPage = i;
                        displayPage(currentPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(btn);
                }
            }
            displayPage(1);
        }
    }


    /* =========================================
       3. FILTRO DE PROJETOS
       ========================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                        card.style.display = 'flex'; 
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('show');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    /* =========================================
       4. CARROSSEL AUTOMÁTICO (Página Sobre)
       ========================================= */
    const track = document.querySelector('.carousel-track');
    
    // Verifica se o carrossel existe antes de rodar a lógica
    if (track) {
        const slides = Array.from(track.children);
        const dots = document.querySelectorAll('.nav-dot');
        let currentSlideIndex = 0;
        let slideInterval;

        const updateSlide = (index) => {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            dots.forEach(dot => dot.classList.remove('current-slide'));
            if(dots[index]) dots[index].classList.add('current-slide');
            currentSlideIndex = index;
        };

        const nextSlide = () => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            updateSlide(nextIndex);
        };

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 3000);
        };

        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };

        startAutoSlide();

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                updateSlide(index);
            });
        });
    }

});

/* =========================================
   5. FUNÇÕES GLOBAIS (FORA DO DOMContentLoaded)
   ========================================= */

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.mobile-menu-icon i');

    if (navLinks) {
        navLinks.classList.toggle('active');
        
        if (menuIcon) {
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    }
}

/* =========================================
   7. SCROLL REVEAL (Animações ao Rolar)
   ========================================= */

// Inicializa o ScrollReveal (Verifica se a biblioteca carregou)
if (typeof ScrollReveal !== 'undefined') {
    
    const sr = ScrollReveal({
        origin: 'top',       // De onde o elemento vem (top, bottom, left, right)
        distance: '50px',    // Distância que ele percorre
        duration: 1000,      // Duração da animação (ms)
        delay: 200,          // Atraso antes de começar
        reset: true          // Se true, anima toda vez que rola (se false, anima só uma vez)
    });

    /* --- GERAIS --- */
    // Títulos das seções
    sr.reveal('.section-title', { delay: 200 });
    sr.reveal('.section-header', { delay: 200 });

    /* --- HOME --- */
    sr.reveal('.hero-content h1', { delay: 200 });
    sr.reveal('.typing-container', { delay: 400 });
    sr.reveal('.hero-description', { delay: 500 });
    sr.reveal('.hero-buttons', { delay: 600, origin: 'bottom' });
    sr.reveal('.tech-ticker-wrapper', { delay: 800, origin: 'bottom' });

    /* --- SOBRE (About) --- */
    // A imagem vem da esquerda
    sr.reveal('.hero-image', { origin: 'left', distance: '100px', duration: 1500 });
    // O texto vem da direita
    sr.reveal('.hero-text', { origin: 'right', distance: '100px', duration: 1500 });
    
    // Stats (Números) - Intervalo cria o efeito "um por um"
    sr.reveal('.stat-item', { interval: 200, origin: 'bottom' });

    // Timeline (Experiência)
    sr.reveal('.timeline-item', { interval: 200, origin: 'left' });

    // Educação Cards
    sr.reveal('.edu-card-premium', { interval: 200, origin: 'bottom' });

    // Skills Dock (Anima o container inteiro para não quebrar o efeito hover do macOS)
    sr.reveal('.skills-dock', { delay: 300, scale: 0.9 });

    /* --- PROJETOS --- */
    // Texto do Hero
    sr.reveal('.proj-hero-content', { scale: 0.9 });

    // Carrossel de Serviços
    sr.reveal('.carousel-container', { delay: 300, origin: 'bottom' });

    // Passos do Processo (Cards)
    sr.reveal('.process-card', { 
        interval: 200,   // Um aparece 200ms depois do outro
        origin: 'bottom', // Vêm de baixo para cima
        distance: '50px'
    });

    // Cards de Projetos (Aparecem em cascata)
    sr.reveal('.project-card', { interval: 200, origin: 'bottom' });
    
    // Contato
    sr.reveal('.contact-header', { origin: 'top' });
    sr.reveal('#contact-link', { delay: 400, scale: 0.5 });
}

/* =========================================
       6. SMART HIDE NAVBAR (Esconder ao rolar)
       ========================================= */
    const navElements = document.querySelectorAll('.fixed-logo, .floating-menu, .theme-floater');
    
    // Configuração
    const scrollThreshold = 100; // Quanto descer para esconder (px)
    const mouseThreshold = 100;  // Quão perto do topo o mouse precisa estar para mostrar (px)

    // Evento de Rolagem (Scroll)
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Se desceu mais que o limite, esconde
        if (currentScroll > scrollThreshold) {
            navElements.forEach(el => el.classList.add('nav-hidden'));
        } else {
            // Se voltou ao topo, mostra
            navElements.forEach(el => el.classList.remove('nav-hidden'));
        }
    });

    // Evento de Mouse (Para Desktop) - "Chamar" o menu passando o mouse no topo
    window.addEventListener('mousemove', (e) => {
        // Se o mouse estiver nos primeiros 100px do topo da tela
        if (e.clientY < mouseThreshold) {
            navElements.forEach(el => el.classList.remove('nav-hidden'));
        }
        
        // (Opcional) Se quiser que o menu apareça no mobile ao tocar na parte inferior:
        // Você precisaria de lógica de 'touchmove', mas geralmente no mobile 
        // o padrão é mostrar apenas ao rolar um pouco para cima (scroll up).
    });

// NOVA FUNÇÃO: Trocar Tema
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    } else {
        localStorage.setItem('theme', 'dark');
        if(icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuIconContainer = document.querySelector('.mobile-menu-icon');
    
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        menuIconContainer && !menuIconContainer.contains(e.target)) {
        toggleMenu();
    }
});
