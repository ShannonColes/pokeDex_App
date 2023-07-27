import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";

const SinglePokemon = () => {
  // bring in the single pokemon
  const { selectedPokemon } = useContext(PokemonContext);
  // variable created for the useNavigate
  const navigate = useNavigate();

  // Function to capitalize the first letter of the name
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="pokemon-render">
      <button className="returnBtn" onClick={() => navigate("/")}>
        Return
      </button>
      <h1>{capitalizeFirstLetter(selectedPokemon.name)}</h1>
      <img src={selectedPokemon.imageURL} alt={selectedPokemon.name} />
    </div>
  );
};

export default SinglePokemon;
