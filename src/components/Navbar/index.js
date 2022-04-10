import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../assets/icons/sibdev-logo.svg";
import classes from "./navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();

  const [state, setState] = useState(true);

  useEffect(() => {
    setState(window.location.pathname == "/favorites" ? true : false);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.nav} position="static" color="inherit">
        <Toolbar className={classes.nav__toolbar}>
          <div className={classes.nav__menu}>
            <Link className={classes.nav__logo} to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography
                style={{ marginLeft: "40px" }}
                className={
                  state === true ? classes.nav__item : classes.nav__item_active
                }
              >
                Поиск
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/favorites">
              <Typography
                style={{ marginLeft: "40px" }}
                className={
                  state === true ? classes.nav__item_active : classes.nav__item
                }
              >
                Избранное
              </Typography>
            </Link>
          </div>
          <Button onClick={handleClick} className={classes.nav__btn}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
