let pokemonRepository = (function() {
  let pokemonList = [{
      name: "Bulbasaur",
      height: 0.7,
      types: ['grass', 'poison']
    },

    {
      name: "Venusaur",
      height: 2,
      types: ['grass', 'poison']
    },

    {
      name: "Weedle",
      height: 0.3,
      types: ['bug', 'poison']
    }
  ];

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
    button.addEventListener('click', function(showDetails) {
      console.log(pokemon.name)
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
