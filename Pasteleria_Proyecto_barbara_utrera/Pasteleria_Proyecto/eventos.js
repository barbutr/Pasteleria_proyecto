let prev = document.getElementById("prev");
let next = document.getElementById("next");

let image = document.querySelector(".Slider-img");
let items = document.querySelectorAll(".Slider-img .Slider-li");
let contents = document.querySelectorAll(".Slider-content .Slider-item");

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function show() {
  // Aplica la rotacion actual del carrusel circular mediante variable CSS.
  image.style.setProperty("--rotate", rotate + "deg");

  // Sincroniza el bloque de texto activo con la imagen visible.
  contents.forEach((content, key) => {
    if (key === active) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });
}

function nextSlider() {
  // Avanza circularmente sin salir del rango.
  active = (active + 1) % countItem;
  rotate = rotate + rotateAdd;
  show();
}

function prevSlider() {
  // Retrocede circularmente manejando indices negativos.
  active = (active - 1 + countItem) % countItem;
  rotate = rotate - rotateAdd;
  show();
}

// Controles manuales del slider.
next.onclick = nextSlider;
prev.onclick = prevSlider;
