const capturedPokemon =
  JSON.parse(localStorage.getItem("capturedPokemon")) || {};

let currentFilter = "all";
let searchText = "";

/* -----------------------------
   NAVEGACIÓN ENTRE PÁGINAS
----------------------------- */
function showPage(pageId) {
  const pages = document.querySelectorAll("section");

  pages.forEach((page) => {
    page.style.display = "none";
  });

  document.getElementById(pageId).style.display = "block";
}

/* -----------------------------
   CARGAR POKÉMON
----------------------------- */
async function loadPokemon() {
  const response = await fetch("data/pokemon.json");
  const pokemonList = await response.json();

  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = pokemon.id;

    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">

      <div class="pokemon-id">
        ${pokemon.id}
      </div>

      <div class="pokemon-name">
        ${pokemon.name}
      </div>

      <button class="capture-button not-captured">
        No Capturado
      </button>
    `;

    const button = card.querySelector("button");

    updateButton(button, pokemon.id);

    button.addEventListener("click", () => {
      capturedPokemon[pokemon.id] =
        !capturedPokemon[pokemon.id];

      localStorage.setItem(
        "capturedPokemon",
        JSON.stringify(capturedPokemon)
      );

      updateButton(button, pokemon.id);

      updateMainProgress(pokemonList);
      updateOverallProgress(pokemonList);

      applyFiltersAndSearch();
    });

    container.appendChild(card);
  });

  updateMainProgress(pokemonList);
  updateOverallProgress(pokemonList);
}

/* -----------------------------
   BOTÓN CAPTURA
----------------------------- */
function updateButton(button, pokemonId) {
  const captured = capturedPokemon[pokemonId];

  if (captured) {
    button.textContent = "Capturado";
    button.classList.remove("not-captured");
    button.classList.add("captured");
  } else {
    button.textContent = "No Capturado";
    button.classList.remove("captured");
    button.classList.add("not-captured");
  }
}

/* -----------------------------
   PROGRESO PRINCIPAL
----------------------------- */
function updateMainProgress(pokemonList) {
  const capturedCount =
    Object.values(capturedPokemon).filter(Boolean).length;

  const totalPokemon = pokemonList.length;

  const percentage =
    (capturedCount / totalPokemon) * 100;

  document.getElementById("main-progress-text")
    .textContent =
    `${capturedCount} / ${totalPokemon} Capturados`;

  document.getElementById("main-progress-fill")
    .style.width =
    `${percentage}%`;
}

/* -----------------------------
   PROGRESO GLOBAL
----------------------------- */
function updateOverallProgress(pokemonList) {
  const capturedCount =
    Object.values(capturedPokemon).filter(Boolean).length;

  const totalPokemon = pokemonList.length;

  const percentage = Math.floor(
    (capturedCount / totalPokemon) * 100
  );

  const degrees = (percentage / 100) * 360;

  document.getElementById("overall-progress-count")
    .textContent =
    `${capturedCount} / ${totalPokemon}`;

  document.getElementById("overall-progress-percent")
    .textContent =
    `${percentage}%`;

  document.getElementById("overall-progress-circle")
    .style.background =
    `conic-gradient(#4caf50 ${degrees}deg, #444 ${degrees}deg)`;
}

/* -----------------------------
   FILTRO
----------------------------- */
function setFilter(filter) {
  currentFilter = filter;
  applyFiltersAndSearch();
}

/* -----------------------------
   BUSCADOR + FILTROS
----------------------------- */
function applyFiltersAndSearch() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const name = card
      .querySelector(".pokemon-name")
      .textContent.toLowerCase();

    const pokemonId = card.dataset.id;
    const captured = capturedPokemon[pokemonId];

    const matchesSearch = name.includes(searchText);

    let matchesFilter = false;

    if (currentFilter === "all") {
      matchesFilter = true;
    }

    if (currentFilter === "captured" && captured) {
      matchesFilter = true;
    }

    if (currentFilter === "not-captured" && !captured) {
      matchesFilter = true;
    }

    card.style.display =
      matchesSearch && matchesFilter
        ? "block"
        : "none";
  });
}

/* -----------------------------
   BUSCADOR INPUT
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");

  input.addEventListener("input", (e) => {
    searchText = e.target.value.toLowerCase();
    applyFiltersAndSearch();
  });
});

/* -----------------------------
   INICIO
----------------------------- */
loadPokemon();