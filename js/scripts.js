// IIFE

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Push pokemon

  function add(pokemon) {
    pokemonList.push(pokemon);
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
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  // Display pokemon details modal

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
    });
  }

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
