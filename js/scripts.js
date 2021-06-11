// IIFE

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Push pokemon

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  // Returns list of pokemon from API generated repo + pushed pokemon

  function getAll() {
    return pokemonList;
  }

  // Creates buttons for all pokemon

  function addListItem(pokemon) {
    let mainList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('main-list-button');
    button.addEventListener('click', function() {
      showDetails(pokemon)
    });
    listItem.appendChild(button);
    mainList.appendChild(listItem);
  }

  // Fetch pokemon list from API

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // Fetch pokemon details from API

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Display pokemon details modal

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  let modalContainer = document.querySelector('#modal-container');

  function showModal(item) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = item.name;
    let pokemonImage = document.createElement('img');
    pokemonImage.src = item.imageUrl;
    pokemonImage.alt = `Sprite of ${item.name}`;
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + item.height + 'cm';
    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = 'Types: ' + item.types;
    let pokemonAbilities = document.createElement('p');
    pokemonAbilities.innerText = 'Abilities: ' + item.abilities;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    modal.appendChild(pokemonAbilities);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  // Return all functions as global variables

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// End of IIFE

// Loads API generated list, then gets complete list with any pushed pokemon & for each pokemon creates a list item.

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
