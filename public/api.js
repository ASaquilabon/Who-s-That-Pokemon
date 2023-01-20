window.getPokeData = async function () {
  const pokemon = await getPokemon(); // fetch array of 151 Pokemon objects
  const randomPokemon = shuffle(pokemon); // shuffle array
  const pokemonChoices = get4Pokemon(randomPokemon);
  const [firstPokemon] = pokemonChoices;
  const image = getPokemonImage(firstPokemon);

  return {
    pokemonChoices: shuffle(pokemonChoices),
    correct: {
      image,
      name: firstPokemon.name,
    },
  };
};

async function getPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const pokemon = await res.json();

  return pokemon.results;
}
function shuffle(unshuffled) {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  console.log(shuffled);
  return shuffled;
}
// Save the first 4 objects from this shuffled array
function get4Pokemon(randomPokemon) {
  console.log(randomPokemon.splice(0, 4));
  return randomPokemon.splice(0, 4);
}

//return an object containing 4 pokemon choices (shuffled) and a "correct object" containing name and image url
function getPokemonImage({ url }) {
  const number = getNumber(url);
  return (
    `https://raw.githubusercontent.com/PokeAPI/` +
    `sprites/master/sprites/pokemon/${number}.png`
  );
}

function getNumber(url) {
  const numberRegex = /(\d+)\/$/;
  return (url.match(numberRegex) || [])[1];
}
