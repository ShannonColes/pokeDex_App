import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import pokedex from "../img/pokedex.png";

const Homepage = () => {
  // set up pokemonContext
  const { setSelectedPokemon } = useContext(PokemonContext);

  // ----------------------------------------------------------------
  // this useState Hook manages the pokemon names.
  const [pokemonNames, setPokemonNames] = useState([]);

  const navigate = useNavigate();
  //   this useEffect hook is fetching data from the api call and is updating the state with the pokemon names.
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151/"
        );
        const pokemonData = response.data.results;
        const detailedPokemonData = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            const type = pokemonResponse.data.types.map(
              (typeData) => typeData.type.name
            );
            const ability = pokemonResponse.data.abilities.map(
              (abilityData) => abilityData.ability.name
            );

            return {
              id: pokemonResponse.data.id,
              name: pokemon.name,
              imageURL:
                pokemonResponse.data.sprites.other["official-artwork"]
                  .front_default,
              ability: ability,
              type: type,
            };
          })
        );

        const pokemons = detailedPokemonData.map((pokemon) => {
          return {
            ...pokemon,
            onSelect: () => setSelectedPokemon(pokemon),
          };
        });

        setPokemonNames(pokemons);
        // setPokemonNames(response.data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonNames();
  }, []);

  // Function to capitalize the first letter of the name
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  //   This renders the pokemon names on the screen.
  return (
    <div>
      <div className="pokedex-image">
        <img src={pokedex} alt="pokedex" />
      </div>
      <h1>Pokemon Originals</h1>
      {/* Apply CSS styles to enable horizontal scrolling */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {pokemonNames.map((item) => (
          <div key={item.name} style={{ margin: "10px" }}>
            <button
              className="singlePageBtn"
              onClick={() => {
                item.onSelect();
                navigate("/pokemon/");
              }}
            >
              <img src={item.imageURL} alt={item.name} width={300} />
              {capitalizeFirstLetter(item.name)}
            </button>
            <div className="info">
              <h3>Type:</h3>
              <h2>{item.type}</h2>
              <h3>Ability:</h3>
              <h2>{item.ability}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
