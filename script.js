const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');
  

  cards.forEach((card) => {
    const name = card.textContent.toLowerCase();

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
  const defaultImage = pokemon.sprites.other["official-artwork"].front_default;
  const shinyImage = pokemon.sprites.other["official-artwork"].front_shiny;
  const ability = pokemon.abilities[0].ability.name;
  const types = pokemon.types.map(t => t.type.name);
  const typeBadges = types.map(t => `<span class="type-badge ${t}">${t}</span>`).join('');
  


  // Fill the card with content using template literals
  card.innerHTML = `
    <img src="${defaultImage}" class="pokemon-img" alt="${name}">
  <h2>${name}</h2>

    <div class="type-badges">${typeBadges}</div>
  <div class="button-row">
    <button class="shiny-btn cry-btn"> My cry</button>
    <button class="shiny-btn ability-btn"> My ability</button>
  </div>
  <p class="ability-text" style="display: none;"> My ability is "${ability}" </p>
`;

    const imgElement = card.querySelector('.pokemon-img');
    const cryBtn = card.querySelector('.cry-btn');
    const abilityElement = card.querySelector('.ability-text');
    const abilityBtn = card.querySelector('.ability-btn');
    

    cryBtn.addEventListener('click', () => {
    if (pokemon.cries && pokemon.cries.latest) {
        const cry = new Audio(pokemon.cries.latest);
        cry.volume = 0.3;
        cry.play();
    }
});

abilityBtn.addEventListener('click', () => {
    imgElement.src = shinyImage || defaultImage;
    abilityElement.style.display = 'block';
    abilityBtn.style.display = 'none';
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