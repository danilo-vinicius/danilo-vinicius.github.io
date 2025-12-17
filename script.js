// Dados dos seus Projetos (Adicione novos aqui)
const projects = [
    {
        title: "Automação de Agendamentos",
        description: "Sistema automatizado utilizando Python e Neppo Sankhya para gerenciar agendamentos de clientes com regras complexas (Green Park).",
        tags: ["Python", "Automação", "Lógica de Negócio"],
        repoLink: "https://github.com/danilo-vinicius", // Coloque o link real se tiver
        demoLink: "#" // Link para vídeo ou demo se tiver
    },
    {
        title: "Dashboard de Segurança Eletrônica",
        description: "Painel interativo para análise de dados do setor de segurança, permitindo visualização de ocorrências e manutenção.",
        tags: ["Power BI", "Análise de Dados", "Excel"],
        repoLink: "https://github.com/danilo-vinicius",
        demoLink: "#"
    },
    {
        title: "Jogo Tetris em Python",
        description: "Recriação do clássico jogo Tetris utilizando a biblioteca Pygame, focado em lógica de programação e orientação a objetos.",
        tags: ["Python", "Pygame", "Game Dev"],
        repoLink: "https://github.com/danilo-vinicius", // Link específico do repo
        demoLink: "#"
    },
    {
        title: "Web Scraper com Selenium",
        description: "Script para coleta automática de dados web, otimizando o processo de captura de informações de sites públicos.",
        tags: ["Python", "Selenium", "Web Scraping"],
        repoLink: "https://github.com/danilo-vinicius",
        demoLink: "#"
    }
];

// Função para renderizar os projetos no HTML
const projectsContainer = document.getElementById('projects-container');

function loadProjects() {
    projects.forEach(project => {
        // Cria o HTML de cada card
        const card = document.createElement('div');
        card.classList.add('project-card');

        // Gera as tags dinamicamente
        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="project-img">
                <i class="fas fa-code"></i> </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
                <div class="project-links">
                    <a href="${project.repoLink}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    ${project.demoLink !== '#' ? `<a href="${project.demoLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(card);
    });
}

// Efeito de digitação no texto inicial
const textElement = document.querySelector(".typing-effect");
    const phrases = [
      "Ciência de Dados",
      "Big Data Analytics",
      "Automação de Processos",
      "Business Intelligence",
      "Python & SQL"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      // Verifica se o elemento existe para evitar erros
      if (!textElement) return;

      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Apaga mais rápido
      } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Digita velocidade normal
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Terminou de escrever a frase inteira
        isDeleting = true;
        typeSpeed = 2000; // Espera 2s antes de apagar
      } else if (isDeleting && charIndex === 0) {
        // Terminou de apagar tudo
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pausa antes de começar a próxima
      }

      setTimeout(type, typeSpeed);
    }

    // Inicia o efeito assim que a página carregar
    document.addEventListener('DOMContentLoaded', type);
