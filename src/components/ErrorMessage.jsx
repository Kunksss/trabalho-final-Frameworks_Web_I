import { Alert, Button } from "@mui/material";

// O botão de tentar novamente só aparece se a página passar a função aoTentarNovamente
function ErrorMessage({ mensagem, aoTentarNovamente }) {
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={
        aoTentarNovamente && (
          <Button color="inherit" size="small" onClick={aoTentarNovamente}>
            Tentar novamente
          </Button>
        )
      }
    >
      {mensagem}
    </Alert>
  );
}

export default ErrorMessage;
