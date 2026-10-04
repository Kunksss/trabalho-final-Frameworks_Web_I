import { Box, Chip } from "@mui/material";
import { traduzirTipo, corDoTipo } from "../utils/pokemonUtils.js";

// Esse componente é usado no card e na página de detalhes, por isso separei
// tipos é o array pokemon.types que vem da API
function TypeChips({ tipos }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
      {tipos.map((item) => (
        <Chip
          key={item.type.name}
          label={traduzirTipo(item.type.name)}
          size="small"
          sx={{ backgroundColor: corDoTipo(item.type.name), color: "white", fontWeight: "bold" }}
        />
      ))}
    </Box>
  );
}

export default TypeChips;
