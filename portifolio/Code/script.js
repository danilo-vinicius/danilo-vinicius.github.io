document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. TYPEWRITER EFFECT (Efeito de Digitação)
       ========================================= */
    const typeWriterElement = document.querySelector('.typewriter-text');
    
    // Só roda se o elemento de digitação existir na página
    if (typeWriterElement) {
        const phrases = [
            "Ciência de Dados",
            "Análise de Dados",
            "Automação em Python",
            "Business Intelligence",
            "Automação de Fluxos e Processos",
            "Soluções em TI"
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
                        // Se estiver usando paginação junto com filtro, precisaria resetar o display aqui,
                        // mas para simplificar, o filtro sobrepõe o display: flex
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
   5. MENU MOBILE (Funções Globais)
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

