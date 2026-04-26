const items = document.querySelectorAll('.timeline-item');

const reveal = () => {
  // Dispara la animacion cuando el item entra en el 85% superior de la ventana.
  const trigger = window.innerHeight * 0.85;

  items.forEach(item => {
    const top = item.getBoundingClientRect().top;

    if (top < trigger) {
      item.classList.add('show');
    }
  });
};

// Revisa visibilidad de items en cada scroll.
window.addEventListener('scroll', reveal);