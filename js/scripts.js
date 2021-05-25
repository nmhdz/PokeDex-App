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

  return {
    getAll: getAll,
    add: add
  };
})();


function myLoopFunction(pokemon) {
  let mainList = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('main-list-button');
  listItem.appendChild(button);
  mainList.appendChild(listItem);
}
pokemonRepository.getAll().forEach(myLoopFunction);
