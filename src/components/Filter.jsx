import { TextField, MenuItem } from "@mui/material";
import { traduzirTipo } from "../utils/pokemonUtils.js";

function Filter({ tipos, valor, aoMudar }) {
  return (
    <TextField
      select
      label="Tipo"
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      fullWidth
      size="small"
    >
      {/* Valor vazio significa que nenhum tipo está filtrado */}
      <MenuItem value="">Todos os tipos</MenuItem>
      {tipos.map((tipo) => (
        <MenuItem key={tipo.name} value={tipo.name}>
          {traduzirTipo(tipo.name)}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default Filter;
