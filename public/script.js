// Toggle do Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Formulário de Sentimentos
const feelingText = document.querySelector('#feeling-text');
const charCount = document.querySelector('#char-count');
const feelingButtons = document.querySelectorAll('.feeling');
const feelingForm = document.querySelector('#feeling-form');

if (feelingText && charCount) {
  feelingText.addEventListener('input', () => {
    charCount.textContent = `${feelingText.value.length}/1000`;
  });
}

if (feelingButtons.length > 0 && feelingText && charCount) {
  feelingButtons.forEach(button => {
    button.addEventListener('click', () => {
      feelingButtons.forEach(item => {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');

      const prefix = `[Sentimento: ${button.dataset.feeling}] `;
      if (!feelingText.value.startsWith('[Sentimento:')) {
        feelingText.value = prefix + feelingText.value;
      } else {
        feelingText.value = feelingText.value.replace(/^\[Sentimento: [^\]]+\] /, prefix);
      }
      charCount.textContent = `${feelingText.value.length}/1000`;
      feelingText.focus();
    });
  });
}

if (feelingForm) {
  // Número da psicóloga no formato internacional (55 + DDD + número, só dígitos)
  const WHATSAPP_NUMBER = '5547996876025';

  feelingForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = document.querySelector('#form-message');
    const texto = feelingText.value.trim();

    if (!texto) {
      if (message) message.textContent = 'Se quiser, escreva algumas palavras ou selecione um sentimento antes de continuar.';
      feelingText.focus();
      return;
    }

    // Monta a mensagem e abre o WhatsApp já com o desabafo preenchido
    const mensagemCompleta = `Olá, Shaylla! Gostaria de compartilhar um desabafo:\n\n${texto}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagemCompleta)}`;

    const janela = window.open(url, '_blank', 'noopener');
    if (!janela) {
      // Se o navegador bloquear a nova aba, abre na mesma janela
      window.location.href = url;
    }

    if (message) {
      message.textContent = 'Abrindo o WhatsApp... Basta tocar em enviar para a mensagem chegar até a psicóloga.';
    }
  });
}

// Slider de Depoimentos
// Lógica do Carrossel Automático de Depoimentos
const testimonialCards = document.querySelectorAll('.testimonial');
const nextBtn = document.querySelector('#next-testimonial');
const prevBtn = document.querySelector('#prev-testimonial');

let currentTestimonialIndex = 0;
let autoSlideInterval;

// Função para exibir o depoimento pelo índice
function showTestimonial(index) {
  if (testimonialCards.length === 0) return;

  // Remove a classe active de todos
  testimonialCards.forEach(card => card.classList.remove('active'));

  // Calcula o índice circular (loop)
  currentTestimonialIndex = (index + testimonialCards.length) % testimonialCards.length;

  // Adiciona active apenas ao depoimento atual
  testimonialCards[currentTestimonialIndex].classList.add('active');
}

// Reinicia o tempo do slider automático ao clicar nas setas
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    showTestimonial(currentTestimonialIndex + 1);
  }, 5000); // 5000ms = 5 segundos
}

// Eventos dos botões de anterior e próximo
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonialIndex + 1);
    resetAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonialIndex - 1);
    resetAutoSlide();
  });
}

// Inicia a troca automática a cada 5 segundos
if (testimonialCards.length > 0) {
  autoSlideInterval = setInterval(() => {
    showTestimonial(currentTestimonialIndex + 1);
  }, 5000);
}