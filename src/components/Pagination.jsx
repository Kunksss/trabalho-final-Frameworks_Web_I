import { Box, Pagination as MuiPagination } from "@mui/material";

// Uso o Pagination do Material UI, só que dentro do meu componente para ficar mais organizado
function Pagination({ pagina, totalPaginas, aoMudar }) {
  // Se só tem uma página não precisa mostrar a paginação
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <MuiPagination
        count={totalPaginas}
        page={pagina}
        onChange={(evento, novaPagina) => aoMudar(novaPagina)}
        color="primary"
      />
    </Box>
  );
}

export default Pagination;
