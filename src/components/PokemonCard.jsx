import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";
import TypeChips from "./TypeChips.jsx";
import { formatarNome, formatarId, pegarImagem } from "../utils/pokemonUtils.js";

// Recebe o Pokémon inteiro por props e só mostra os dados
function PokemonCard({ pokemon }) {
  const imagem = pegarImagem(pokemon);

  return (
    <Card sx={{ height: "100%", "&:hover": { boxShadow: 6 } }}>
      {/* O card inteiro é um link para a página de detalhes */}
      <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`} sx={{ height: "100%" }}>
        {imagem ? (
          <CardMedia
            component="img"
            image={imagem}
            alt={pokemon.name}
            loading="lazy"
            sx={{ height: 140, objectFit: "contain", p: 1, backgroundColor: "#eeeeee" }}
          />
        ) : (
          // Alguns Pokémon (formas especiais) não têm imagem na API
          <Box
            sx={{
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eeeeee",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Sem imagem
            </Typography>
          </Box>
        )}
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            {formatarId(pokemon.id)}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "1.05rem", mb: 1 }}>
            {formatarNome(pokemon.name)}
          </Typography>
          <TypeChips tipos={pokemon.types} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;
