let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Bulbasaur",
     height: 0.7,
     types: ['grass', 'poison']},

    {name: "Venusaur",
     height: 2,
     types: ['grass', 'poison']},

    {name: "Weedle",
     height: 0.3,
     types: ['bug', 'poison']}
  ];

  function getAll(){
    return pokemonList;
}

  function add(pokemon){
    pokemonList.push(pokemon);
}

  return {
    getAll: getAll,
    add: add
};
})();


function myLoopFunction(pokemon){
  document.write("<p>" + pokemon.name + " " + " (height: " + pokemon.height + ")" + " " + "(type: " + pokemon.types + ")" +"</p>");
}
pokemonRepository.getAll().forEach(myLoopFunction);
