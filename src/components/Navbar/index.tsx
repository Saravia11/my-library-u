import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  MenuItem,
  Toolbar,
  AppBar,
  Menu,
  Box,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userLoading, user } = useUser(Cookies.get("user_id")!);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_role");
    navigate("/login");
    setAnchorEl(null);
  };

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const fullName = `${user?.name} ${user?.last_name}`;
  if (userLoading) return <></>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>My U Library - {fullName}</title>
      </Helmet>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {fullName} - {capitalize(user!.role)}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
