import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, json, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("local");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const Header = styled(AppBar)`
    background: black;
  `;

  const Tab = styled(NavLink)`
    color: white;
    text-decoration: none;
  `;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Header position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {auth ? (
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Tab to="/add">
                    <Button color="inherit">AddUser</Button>
                  </Tab>

                  <Tab to="/all">
                    <Button color="inherit">AllUsers</Button>
                  </Tab>
                </Typography>

                <Tab to="/login">
                  <Button color="inherit" onClick={logout}>
                    Logout ({JSON.parse(auth).name})
                  </Button>
                </Tab>
              </>
            ) : (
              <>
                <Tab to="/register">
                  <Button color="inherit">Signup</Button>
                </Tab>
                <Tab to="/login">
                  <Button color="inherit">Login</Button>
                </Tab>
              </>
            )}
          </Toolbar>
        </Header>
      </Box>
    </div>
  );
};

export default Navbar;
