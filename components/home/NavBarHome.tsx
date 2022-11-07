import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import classes from "./navbar-home.module.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface NavBarHomeProps {
  window?: () => Window;
}

const NavBarHome: React.FC<NavBarHomeProps> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const session = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // TODO: Redirect to Home
    signOut({ redirect: false });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Anti-Cheat Exam App
      </Typography>
      <Divider />
      <List>
        {["Home"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/">
            <Image
              src="/images/logo.png"
              height="48px"
              width="48px"
              alt="Logo"
              className={classes.navLogo}
            />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Anti-Cheat Exam App
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link href="/">
              <Button sx={{ color: "#fff" }}>Home</Button>
            </Link>

            {session.status === "authenticated" && (
              <Link href="/dashboard">
                <Button sx={{ color: "#fff" }}>Dashboard</Button>
              </Link>
            )}

            {session.status === "unauthenticated" && (
              <Link href="/auth/login">
                <Button sx={{ color: "#fff" }}>Login</Button>
              </Link>
            )}

            {session.status === "authenticated" && (
              <Button
                // variant="contained"
                // size="small"
                // color="warning"
                onClick={handleLogout}
                sx={{ color: "#fff" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

export default NavBarHome;
