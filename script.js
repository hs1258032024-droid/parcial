/*
 * Explora Chalatenango | Lógica de interacción
 * Las funciones están separadas por responsabilidad para facilitar
 * su lectura, pruebas y mantenimiento.
 */

"use strict";

// Datos de ejemplo que alimentan las tarjetas. Se pueden ampliar sin modificar el HTML.
const destinations = [
  {
    name: "Cerro El Pital",
    category: "naturaleza",
    label: "Naturaleza",
    description: "Un destino de altura, clima fresco y paisajes montañosos para disfrutar al aire libre.",
    image: "assets/el-pital.svg",
    alt: "Ilustración de un cerro verde rodeado de pinos"
  },
  {
    name: "La Palma",
    category: "pueblo",
    label: "Cultura y tradición",
    description: "Un pueblo reconocido por sus colores, artesanías y expresiones de identidad local.",
    image: "assets/la-palma.svg",
    alt: "Ilustración de casas coloridas inspiradas en La Palma"
  },
  {
    name: "San Ignacio",
    category: "pueblo",
    label: "Pueblo",
    description: "Un lugar de ambiente tranquilo que sirve como punto de partida para explorar la zona.",
    image: "assets/san-ignacio.svg",
    alt: "Ilustración de un paisaje de pueblo entre montañas"
  }
];

const destinationGrid = document.querySelector("#destinationGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#destinationSearch");
const filterButtons = document.querySelectorAll(".filter-button");

let activeCategory = "todos";

/**
 * Construye las tarjetas a partir de los datos y los criterios seleccionados.
 * Se utiliza textContent para insertar texto de forma segura en el DOM.
 */
function renderDestinations() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("es");

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory = activeCategory === "todos" || destination.category === activeCategory;
    const matchesSearch = destination.name.toLocaleLowerCase("es").includes(searchTerm)
      || destination.description.toLocaleLowerCase("es").includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  destinationGrid.replaceChildren();

  filteredDestinations.forEach((destination) => {
    const article = document.createElement("article");
    article.className = "destination-card";

    const image = document.createElement("img");
    image.src = destination.image;
    image.alt = destination.alt;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card-content";

    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = destination.label;

    const title = document.createElement("h3");
    title.textContent = destination.name;

    const description = document.createElement("p");
    description.textContent = destination.description;

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "#rutas";
    link.textContent = "Consultar rutas →";
    link.setAttribute("aria-label", `Consultar rutas para ${destination.name}`);

    content.append(category, title, description, link);
    article.append(image, content);
    destinationGrid.append(article);
  });

  // El estado vacío informa al usuario cuando ningún elemento coincide con la búsqueda.
  emptyState.hidden = filteredDestinations.length !== 0;
}

/**
 * Actualiza el filtro activo y su estado accesible aria-pressed.
 * @param {string} category - Categoría seleccionada por el usuario.
 */
function setActiveCategory(category) {
  activeCategory = category;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderDestinations();
}

/**
 * Abre o cierra el menú móvil y mantiene sincronizado aria-expanded.
 */
function toggleMobileMenu() {
  const menu = document.querySelector("#mainNav");
  const toggle = document.querySelector("#menuToggle");
  const isOpen = menu.classList.toggle("is-open");

  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
}

/**
 * Cambia entre tema claro y oscuro. La clase se aplica al body para
 * que las variables CSS actualicen los colores de toda la interfaz.
 */
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  const themeLabel = document.querySelector(".theme-label");
  const themeButton = document.querySelector("#themeToggle");

  themeLabel.textContent = isDark ? "Modo claro" : "Modo oscuro";
  themeButton.setAttribute("aria-label", isDark ? "Activar tema claro" : "Activar tema oscuro");
}

/**
 * Valida el correo antes de mostrar una confirmación local.
 * No se envían datos a un servidor ni se almacenan datos personales.
 * @param {SubmitEvent} event - Evento de envío del formulario.
 */
function handleContactSubmit(event) {
  event.preventDefault();

  const emailInput = document.querySelector("#email");
  const message = document.querySelector("#formMessage");
  const email = emailInput.value.trim();

  if (!emailInput.checkValidity() || email === "") {
    message.textContent = "Escribe una dirección de correo válida para continuar.";
    emailInput.focus();
    return;
  }

  message.textContent = "¡Gracias! El correo se validó correctamente (demostración).";
  event.currentTarget.reset();
}

// Registro centralizado de eventos.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveCategory(button.dataset.filter));
});

searchInput.addEventListener("input", renderDestinations);
document.querySelector("#menuToggle").addEventListener("click", toggleMobileMenu);
document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
document.querySelector("#contactForm").addEventListener("submit", handleContactSubmit);

// En móvil, al elegir una sección se cierra el menú para no cubrir el contenido.
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#mainNav");
    const toggle = document.querySelector("#menuToggle");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  });
});

// Inicialización de la interfaz.
document.querySelector("#currentYear").textContent = new Date().getFullYear();
renderDestinations();
