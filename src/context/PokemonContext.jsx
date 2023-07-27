import { createContext, useState } from "react";

export const PokemonContext = createContext();

// article provider what happens with it.
export const PokemonContextProvider = ({ children }) => {
  // pass null so no article is in there by default.
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
