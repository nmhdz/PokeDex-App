let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

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

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();


function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}
pokemonRepository.getAll().forEach(myLoopFunction);
