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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " -Wow, that\'s big!");
  }
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br> ");
};
