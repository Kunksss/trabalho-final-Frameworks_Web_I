import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Home from "./pages/Home.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* O :id vira o número do Pokémon que foi clicado */}
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          {/* Qualquer outro endereço cai aqui */}
          <Route
            path="*"
            element={
              <ErrorMessage mensagem="Página não encontrada. Clique em Pokédex React, no topo, para voltar." />
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
