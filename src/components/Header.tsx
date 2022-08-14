import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ListIcon from "@mui/icons-material/List";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

const pages = [
  ["工数一覧", "/"],
  ["工数登録", "/regist"],
  ["カテゴリ一覧", "/category"],
  ["カテゴリ登録", "/category-regist"],
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <AlarmOnIcon
            sx={{ marginRight: "5px", display: { xs: "none", md: "flex" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            工数チェッカー
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={page[1]}
                    sx={{ textDecoration: "none", color: "unset" }}
                  >
                    {page[0]}
                  </Typography>
                  {page[0] === "工数一覧" ? (
                    <ListIcon sx={{ "margin-left": "10px" }} />
                  ) : (
                    <></>
                  )}
                  {page[0] === "工数登録" ? (
                    <AppRegistrationIcon sx={{ "margin-left": "10px" }} />
                  ) : (
                    <></>
                  )}
                  {page[0] === "カテゴリ一覧" ? (
                    <ListIcon sx={{ "margin-left": "10px" }} />
                  ) : (
                    <></>
                  )}
                  {page[0] === "カテゴリ登録" ? (
                    <AppRegistrationIcon sx={{ "margin-left": "10px" }} />
                  ) : (
                    <></>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AlarmOnIcon
            sx={{ marginRight: "5px", display: { xs: "flex", md: "none" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            工数チェッカー
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "flex" }}
                component={Link}
                to={page[1]}
              >
                {page[0] === "工数一覧" ? <ListIcon /> : <></>}
                {page[0] === "工数登録" ? <AppRegistrationIcon /> : <></>}
                {page[0] === "カテゴリ一覧" ? <ListIcon /> : <></>}
                {page[0] === "カテゴリ登録" ? <AppRegistrationIcon /> : <></>}
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography component={Link} to={"/dashboard"} sx={{ textDecoration: "none", color: "unset" }}>{user?.displayName}</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
