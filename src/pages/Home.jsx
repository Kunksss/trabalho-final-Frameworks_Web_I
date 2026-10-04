import { useState, useEffect } from "react";
import { Box, Typography, Alert } from "@mui/material";
import SearchBar from "../components/SearchBar.jsx";
import Filter from "../components/Filter.jsx";
import PokemonCard from "../components/PokemonCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import {
  POKEMON_POR_PAGINA,
  listarPokemons,
  listarTodosOsNomes,
  listarTipos,
  listarPokemonsPorTipo,
  buscarPokemon,
  pegarIdDaUrl,
} from "../services/pokemonService.js";
import { TIPOS_PT, traduzirTipo } from "../utils/pokemonUtils.js";

function Home() {
  // Pokémon que aparecem na página atual
  const [pokemons, setPokemons] = useState([]);
  // Lista de tipos para o filtro
  const [tipos, setTipos] = useState([]);
  // Esse estado controla a mensagem que aparece durante o carregamento
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  // O que o usuário está digitando na busca
  const [busca, setBusca] = useState("");
  // Texto da busca já "estabilizado", usado de verdade na consulta
  const [buscaFinal, setBuscaFinal] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  // Só serve para refazer a busca quando o usuário clica em tentar novamente
  const [tentativa, setTentativa] = useState(0);

  // Carrega os tipos uma vez só, quando a página abre
  useEffect(() => {
    async function carregarTipos() {
      try {
        const lista = await listarTipos();
        // Só deixo os tipos que eu traduzi, assim "unknown" e "shadow" ficam de fora
        const tiposValidos = lista.filter((tipo) => TIPOS_PT[tipo.name]);
        tiposValidos.sort((a, b) => traduzirTipo(a.name).localeCompare(traduzirTipo(b.name)));
        setTipos(tiposValidos);
      } catch (error) {
        console.log("Erro ao carregar os tipos:", error);
      }
    }
    carregarTipos();
  }, []);

  // Espera o usuário parar de digitar um pouquinho antes de buscar,
  // senão cada letra faria um monte de requisições
  useEffect(() => {
    const timer = setTimeout(() => {
      // Troco espaço por hífen porque na API é assim: "mr-mime"
      setBuscaFinal(busca.trim().toLowerCase().replace(/\s+/g, "-"));
      setPagina(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [busca]);

  // Quando a busca, o tipo ou a página mudam, a lista é atualizada novamente
  useEffect(() => {
    // Evita que uma resposta antiga sobrescreva uma mais nova
    let cancelado = false;

    async function carregarPokemons() {
      setCarregando(true);
      setErro("");

      try {
        const inicio = (pagina - 1) * POKEMON_POR_PAGINA;
        let lista = [];
        let total = 0;

        if (buscaFinal === "" && tipoSelecionado === "") {
          // Sem filtro: uso a paginação da própria API (limit e offset)
          const dados = await listarPokemons(POKEMON_POR_PAGINA, inicio);
          lista = dados.results;
          total = dados.count;
        } else {
          // Com filtro: pego a lista base e filtro aqui mesmo
          let base;
          if (tipoSelecionado !== "") {
            base = await listarPokemonsPorTipo(tipoSelecionado);
          } else {
            base = await listarTodosOsNomes();
          }

          // A busca funciona pelo nome ou pelo número do Pokémon
          if (buscaFinal !== "") {
            base = base.filter(
              (p) => p.name.includes(buscaFinal) || String(pegarIdDaUrl(p.url)) === buscaFinal
            );
          }

          total = base.length;
          lista = base.slice(inicio, inicio + POKEMON_POR_PAGINA);
        }

        // A lista só tem nome e url, então busco os dados completos de cada um da página
        const detalhes = await Promise.all(lista.map((p) => buscarPokemon(p.name)));

        if (cancelado) return;
        setPokemons(detalhes);
        setTotalResultados(total);
        setTotalPaginas(Math.ceil(total / POKEMON_POR_PAGINA));
      } catch (error) {
        // Se a API retornar erro, mostro uma mensagem para o usuário
        if (cancelado) return;
        console.log("Erro ao buscar os Pokémon:", error);
        setPokemons([]);
        setErro("Não foi possível carregar os Pokémon agora. Verifique sua internet e tente novamente.");
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    carregarPokemons();

    return () => {
      cancelado = true;
    };
  }, [pagina, buscaFinal, tipoSelecionado, tentativa]);

  // Quando troca o tipo volto para a página 1, senão poderia sobrar uma página que não existe
  function mudarTipo(novoTipo) {
    setTipoSelecionado(novoTipo);
    setPagina(1);
  }

  function mudarPagina(novaPagina) {
    setPagina(novaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        Pokédex
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Pesquise por nome ou número e filtre pelo tipo. Os dados vêm da PokéAPI.
      </Typography>

      {/* Busca e filtro lado a lado no computador e um embaixo do outro no celular */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 3 }}>
        <SearchBar valor={busca} aoMudar={setBusca} />
        <Filter tipos={tipos} valor={tipoSelecionado} aoMudar={mudarTipo} />
      </Box>

      {carregando && <Loading mensagem="Carregando Pokémon..." />}

      {!carregando && erro && (
        <ErrorMessage mensagem={erro} aoTentarNovamente={() => setTentativa(tentativa + 1)} />
      )}

      {!carregando && !erro && pokemons.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }}>
          Nenhum Pokémon encontrado. Tente outro nome ou outro tipo.
        </Alert>
      )}

      {!carregando && !erro && pokemons.length > 0 && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {totalResultados} Pokémon encontrados - página {pagina} de {totalPaginas}
          </Typography>

          {/* Uso o grid do CSS pelo sx para a lista ficar responsiva */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 2,
            }}
          >
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Box>

          <Pagination pagina={pagina} totalPaginas={totalPaginas} aoMudar={mudarPagina} />
        </>
      )}
    </Box>
  );
}

export default Home;
