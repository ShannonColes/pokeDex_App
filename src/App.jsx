import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { PokemonContextProvider } from "./context/PokemonContext";

// import pages
import Homepage from "./pages/Homepage";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePokemon from "./components/SinglePokemon";

function App() {
  return (
    <>
      <HashRouter>
        <PokemonContextProvider>
          <Header />
          <Routes>
            {/* set up routes */}
            <Route exact path="/" element={<Homepage />} />
            <Route path="/Pokemon" element={<SinglePokemon />} />
          </Routes>
          <Footer />
        </PokemonContextProvider>
      </HashRouter>
    </>
  );
}

export default App;
