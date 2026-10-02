const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const name = card.querySelector('h2').textContent.toLowerCase();

    if (name.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

async function fetchPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    createPokemonCard(data);
  } catch (error) {
    console.error(`Failed to fetch Pokémon #${id}:`, error);
  }
}


function createPokemonCard(pokemon) {
  
  const card = document.createElement('div');
  card.classList.add('card');

  
  const name = pokemon.name;
  const defaultImage = pokemon.sprites.front_default;
  const shinyImage = pokemon.sprites.front_shiny;
  const ability = pokemon.abilities[0].ability.name;

  // Fill the card with content using template literals
  card.innerHTML = `
    <img src="${defaultImage}" class="pokemon-img" alt="${name}">
    <h2>${name}</h2>
    <button class="shiny-btn"> Click me! </button>
    <p class="ability-text" style="display: none;">Ability: ${ability} </p>
  `;

    const imgElement = card.querySelector('.pokemon-img');
    const btnElement = card.querySelector('.shiny-btn');
    const abilityElement = card.querySelector('.ability-text');

    btnElement.addEventListener('click', () => {
        imgElement.src = shinyImage || defaultImage;
        abilityElement.style.display = 'block';
    });

  container.appendChild(card);
}


async function loadGallery(limit = 28) {
  for (let i = 1; i <= limit; i++) {
    await fetchPokemon(i);
  }
}

// Run the function when the page loads
loadGallery(28);