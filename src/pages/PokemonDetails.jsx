import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Chip, LinearProgress, Typography } from "@mui/material";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import TypeChips from "../components/TypeChips.jsx";
import { buscarPokemon } from "../services/pokemonService.js";
import { formatarNome, formatarId, pegarImagem, traduzirStat } from "../utils/pokemonUtils.js";

function PokemonDetails() {
  // Aqui pego o ID pela URL para buscar os dados do Pokémon selecionado
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  // Sempre que o id da URL muda, busca o Pokémon de novo
  useEffect(() => {
    let cancelado = false;

    async function carregarPokemon() {
      setCarregando(true);
      setErro("");
      setPokemon(null);

      try {
        const dados = await buscarPokemon(id);
        if (!cancelado) {
          setPokemon(dados);
        }
      } catch (error) {
        if (cancelado) return;
        console.log("Erro ao buscar o Pokémon:", error);
        // O erro 404 acontece quando o id da URL não existe
        if (error.response && error.response.status === 404) {
          setErro("Pokémon não encontrado. Confira o número na URL.");
        } else {
          setErro("Não foi possível carregar os detalhes agora. Tente novamente.");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    carregarPokemon();

    return () => {
      cancelado = true;
    };
  }, [id, tentativa]);

  return (
    <Box>
      {/* Botão para voltar para a listagem */}
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        Voltar para a listagem
      </Button>

      {carregando && <Loading mensagem="Carregando detalhes..." />}

      {!carregando && erro && (
        <ErrorMessage mensagem={erro} aoTentarNovamente={() => setTentativa(tentativa + 1)} />
      )}

      {!carregando && pokemon && (
        <Card sx={{ maxWidth: 700, mx: "auto" }}>
          <CardContent>
            {pegarImagem(pokemon) && (
              <Box
                component="img"
                src={pegarImagem(pokemon)}
                alt={pokemon.name}
                sx={{ display: "block", mx: "auto", height: 220, objectFit: "contain" }}
              />
            )}

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                {formatarId(pokemon.id)}
              </Typography>
              <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                {formatarNome(pokemon.name)}
              </Typography>
              <TypeChips tipos={pokemon.types} />
            </Box>

            {/* Na API a altura vem em decímetros e o peso em hectogramas, por isso divido por 10 */}
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Altura
                </Typography>
                <Typography variant="h6">{pokemon.height / 10} m</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Peso
                </Typography>
                <Typography variant="h6">{pokemon.weight / 10} kg</Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Habilidades
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {pokemon.abilities.map((item) => (
                <Chip
                  key={item.ability.name}
                  label={formatarNome(item.ability.name)}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Estatísticas
            </Typography>
            {pokemon.stats.map((item) => (
              <Box key={item.stat.name} sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">{traduzirStat(item.stat.name)}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {item.base_stat}
                  </Typography>
                </Box>
                {/* 255 é o maior valor possível de um stat, então a barra fica proporcional a ele */}
                <LinearProgress
                  variant="determinate"
                  value={Math.min((item.base_stat / 255) * 100, 100)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default PokemonDetails;
