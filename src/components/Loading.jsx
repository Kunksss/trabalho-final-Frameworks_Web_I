import { Box, CircularProgress, Typography } from "@mui/material";

// A mensagem chega por props, se não vier uso o texto padrão
function Loading({ mensagem = "Carregando..." }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6 }}>
      <CircularProgress color="primary" />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {mensagem}
      </Typography>
    </Box>
  );
}

export default Loading;
