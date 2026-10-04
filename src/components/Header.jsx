import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          component="img"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="Pokébola"
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", fontWeight: "bold" }}
        >
          Pokédex React
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;