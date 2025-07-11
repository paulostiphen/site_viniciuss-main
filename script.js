function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

window.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Explosão ao clicar no card
  const cards = document.querySelectorAll('.card.clickable');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const explosion = document.getElementById('explosion');
      explosion.classList.add('active');

      const url = card.dataset.url;
      setTimeout(() => {
        explosion.classList.remove('active');
        window.location.href = url;
      }, 600);
    });
  });

  // Texto digitando
  const frases = ["Simplifique o registro de aulas", "Facilite a rotina escolar", "Modernize sua gestão educacional"];
  const typedText = document.getElementById("typed-text");
  let i = 0, j = 0, apagando = false;

  function digitar() {
    if (!typedText) return;
    const fraseAtual = frases[i];
    if (!apagando && j <= fraseAtual.length) {
      typedText.textContent = fraseAtual.slice(0, j++);
    } else if (apagando && j > 0) {
      typedText.textContent = fraseAtual.slice(0, j--);
    }

    if (j === fraseAtual.length) apagando = true;
    if (j === 0 && apagando) {
      apagando = false;
      i = (i + 1) % frases.length;
    }

    setTimeout(digitar, apagando ? 50 : 100);
  }
  digitar();

  
  // Botão voltar ao topo
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Partículas animadas
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#00c2ff55';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Busca por funcionalidade
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(query) ? 'block' : 'none';
      });
    });
  }

  // Frases motivacionais aleatórias
  const frasesRodape = [
    "Transforme a educação com organização!",
    "Seu tempo vale ouro. Registre com praticidade.",
    "Tecnologia a favor da sua turma!",
    "Agilidade na palma da sua mão!",
    "O futuro da gestão escolar começa aqui."
  ];
  const quoteElement = document.getElementById("randomQuote");
  if (quoteElement) {
    const randomIndex = Math.floor(Math.random() * frasesRodape.length);
    quoteElement.textContent = frasesRodape[randomIndex];
  }

  // Loader na tela de carregamento
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1000);
  }
});
    // Ripple effect
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.ripple');
      if (!target) return;

      const circle = document.createElement('span');
      circle.classList.add('ripple-circle');
      const rect = target.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;
      target.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });

    // Animação da lista diferencial
    window.addEventListener('DOMContentLoaded', () => {
      const items = document.querySelectorAll('.animated-list li');
      items.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach(item => {
              item.style.opacity = 1;
              item.style.transform = 'translateX(0)';
            });
            observer.disconnect();
          }
        });
      });
      const section = document.querySelector('.animated-list');
      if (section) observer.observe(section);
    });
 
  document.getElementById('acessibilidadeBtn').addEventListener('click', () => {
    const textoParaLer = "Bem-vindo ao FormGestor. Um sistema moderno para representantes de turma e coordenadores do SENAI.";
    const legenda = document.getElementById('legendaAcessibilidade');
    const synth = window.speechSynthesis;

    // Ativa/Desativa fonte para dislexia
    document.body.classList.toggle('dyslexia-mode');

    // Fala e legenda
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(textoParaLer);
      synth.cancel(); // Para qualquer leitura anterior
      synth.speak(utter);
      legenda.innerText = textoParaLer;
      legenda.style.display = 'block';

      // Oculta legenda após leitura
      utter.onend = () => {
        setTimeout(() => legenda.style.display = 'none', 3000);
      };
    } else {
      alert("Este navegador não suporta leitura de voz.");
    }
  });


  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });



   


