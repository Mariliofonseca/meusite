// JavaScript para o site Viagem Europa 2025

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
    
    // Animação de entrada
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Galeria de imagens
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const caption = item.querySelector('.gallery-caption').textContent;
            
            // Criar modal
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            modal.innerHTML = `
                <div class="gallery-modal-content">
                    <span class="gallery-modal-close">&times;</span>
                    <img src="${imgSrc}" alt="${caption}">
                    <div class="gallery-modal-caption">${caption}</div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Fechar modal
            modal.querySelector('.gallery-modal-close').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // Verificar se o site está sendo usado offline
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    function updateOnlineStatus() {
        const statusIndicator = document.querySelector('.connection-status');
        if (!statusIndicator) return;
        
        if (navigator.onLine) {
            statusIndicator.textContent = 'Online';
            statusIndicator.classList.remove('offline');
            statusIndicator.classList.add('online');
        } else {
            statusIndicator.textContent = 'Offline';
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
        }
    }
    
    // Inicializar status
    updateOnlineStatus();
    
    // Expandir todas as seções do roteiro
    document.querySelectorAll('.expand-all').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const items = document.querySelectorAll(section + ' .accordion-item');
            
            items.forEach(item => {
                item.classList.add('active');
            });
        });
    });
    
    // Carregar conteúdo completo
    document.querySelectorAll('.load-content').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Mostrar seção completa
                targetSection.classList.add('show-full');
                // Esconder botão
                this.style.display = 'none';
            }
        });
    });
});
