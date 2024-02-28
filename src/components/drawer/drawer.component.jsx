import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Highlights from "../stacked-card/stacked-card";

import Charts from "../charts/charts.component";

import logo from "../../assets/logo.png";

// Import Material-UI icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MessageIcon from "@mui/icons-material/Message";
import InboxIcon from "@mui/icons-material/Inbox";
import ReceiptIcon from "@mui/icons-material/Receipt";

import MainDatagrid from "../datagrid/main.datagrid";

import "./styles.css";
import { useDataContext } from "../../context/DataContext";

const drawerWidth = 240;

function ResponsiveDrawer() {
  const { appData, loading, error } = useDataContext();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="site-side-nav-warpper">
      <Toolbar>
        <img src={logo} alt="site-logo" />
      </Toolbar>
      <Divider />
      <List>
        {["Profile", "Chat", "Analysis", "Revenue"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AccountCircleIcon /> : null}
                {index === 1 ? <ChatIcon /> : null}
                {index === 2 ? <TrendingUpIcon /> : null}
                {index === 3 ? <AttachMoneyIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div
          style={{
            display: "flex",
            padding: "4px 16px",
          }}
        >
          <span>Support</span>
        </div>
        {["Messages", "Inbox", "Invoice"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <MessageIcon /> : null}
                {index === 1 ? <InboxIcon /> : null}
                {index === 2 ? <ReceiptIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box id="app-main-container" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
        className="site-appbar"
      >
        <Toolbar
          sx={{
            background: "none",
            backgroundColor: "#fff",
            boxShadow: "none",
            borderRadius: "4px",
            border: "1px solid rgba(47, 43, 61, 0.16)",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              md: "block",
              lg: "none",
              xl: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              md: "none",
              lg: "block",
              xl: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#fff",
          borderRadius: "8px 0px",
          overflowX: "auto",
        }}
      >
        <Toolbar />
        {loading ? (
          <h1>Loading.....</h1>
        ) : (
          <>
            <Highlights />
            <Charts data={appData} />
            <div style={{ margin: "12px 24px" }}>
              <MainDatagrid />
            </div>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
