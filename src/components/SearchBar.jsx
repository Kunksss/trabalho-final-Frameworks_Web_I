import { TextField } from "@mui/material";

// O valor e a função que muda o valor vêm da página Home por props
function SearchBar({ valor, aoMudar }) {
  return (
    <TextField
      label="Buscar por nome ou número"
      placeholder="Ex: pikachu ou 25"
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      fullWidth
      size="small"
    />
  );
}

export default SearchBar;
