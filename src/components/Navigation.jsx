import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          Base de Conhecimentos 🌏
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: location.pathname === "/" ? "secondary.main" : "inherit",
            }}
          >
            Início
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/pessoas"
            sx={{
              color:
                location.pathname === "/pessoas" ? "secondary.main" : "inherit",
            }}
          >
            Pessoas
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/skills"
            sx={{
              color:
                location.pathname === "/skills" ? "secondary.main" : "inherit",
            }}
          >
            Skills
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
