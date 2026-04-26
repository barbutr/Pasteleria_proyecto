
window.addEventListener('load', () => {
  // Activa la animacion inicial del CTA del hero cuando termina de cargar la pagina.
  document.querySelector('.Hero-call').classList.add('isVisible');
});

//Pagina de Carta
// SELECTORES
const buttons = document.querySelectorAll('.Menu-filters button');
const cards = document.querySelectorAll('.Card');


// FILTROS
buttons.forEach(button => {
  button.addEventListener('click', () => {

    // Marca visualmente el filtro activo.
    buttons.forEach(btn => btn.classList.remove('isActive'));
    button.classList.add('isActive');

    const filter = button.dataset.filter || 'all';

    // Muestra/oculta cards segun la categoria seleccionada.
    cards.forEach(card => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

  });
});


// ANIMACIÓN
const bump = (el) => {
  // Microanimacion para dar feedback al cambiar cantidades.
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 150);
};


// CONTADOR
cards.forEach(card => {

  const minus = card.querySelector('.minus');
  const plus = card.querySelector('.plus');
  const number = card.querySelector('.number');

  // Evita errores en vistas donde no exista el selector de cantidad.
  if (!minus || !plus || !number) return;

  let count = 1;

  plus.addEventListener('click', () => {
    count++;
    number.textContent = count;
    bump(number);
  });

  minus.addEventListener('click', () => {
    if (count > 1) {
      count--;
      number.textContent = count;
      bump(number);
    }
  });

});


// CARRITO
const cartToggle = document.querySelector('.Cart-toggle');
const cartPanel = document.querySelector('.Cart-panel');
const cartClose = document.querySelector('.Cart-close');
const cartItemsContainer = document.querySelector('.Cart-items');
const cartTotal = document.querySelector('.Cart-total');
const cartCount = document.querySelector('.Cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];


// ABRIR / CERRAR (con protección)
if (cartToggle && cartPanel) {
  cartToggle.addEventListener('click', () => {
    cartPanel.classList.add('open');
  });
}

if (cartClose && cartPanel) {
  cartClose.addEventListener('click', () => {
    cartPanel.classList.remove('open');
  });
}


// AÑADIR PRODUCTO
const orderButtons = document.querySelectorAll('.Card-btn');

orderButtons.forEach(button => {

  button.addEventListener('click', () => {

    const card = button.closest('.Card');

    const name = card.querySelector('.Card-title').textContent;
    const price = parseFloat(card.dataset.price);
    const quantity = parseInt(card.querySelector('.number').textContent);

    // Si ya existe en carrito, acumula; si no, lo crea.
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    updateCart();
    saveCart();

  });

});


// ACTUALIZAR UI
function updateCart() {

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  // Recalcula total y contador global en cada render de carrito.
  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement('div');
    div.classList.add('Cart-item');

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        ${item.quantity} x €${item.price}
      </div>
      <button data-index="${index}">🗑️</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = `€${total.toFixed(2)}`;
  if (cartCount) cartCount.textContent = count;

  // Reasigna eventos de borrado porque la lista se reconstruye en cada render.
  document.querySelectorAll('.Cart-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(btn.dataset.index, 1);
      updateCart();
      saveCart();
    });
  });

}


// GUARDAR
function saveCart() {
  // Persistencia simple para conservar el carrito entre recargas.
  localStorage.setItem('cart', JSON.stringify(cart));
}


// INIT
updateCart();

const decor = document.querySelectorAll('.Hero-decor');

window.addEventListener('scroll', () => {
  let scroll = window.scrollY;

  decor.forEach((el, i) => {
    // Parallax: cada decoracion se mueve a distinta velocidad.
    let speed = (i + 1) * 0.05;
    el.style.transform = `translateY(${scroll * speed}px) rotate(${scroll * 0.05}deg)`;
  });
});