import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { background } from "@chakra-ui/react";
import Chart from "./components/chart";
import { FaRupeeSign } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { useEffect } from "react";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchAdmin = async (token) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    let Res = await a.json();
    if (Res.role !== "admin") {
      router.push("/");
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      const myuser = JSON.parse(localStorage.getItem("myuser"));
      fetchAdmin(myuser.token);
    } else {
      router.push("/");
    }
  }, []);
  if (!open) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          className=" bg-custom-skin text-black"
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className=" bg-custom-skin ">
            <h1 className=" text-2xl">Actions</h1>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <button
            onClick={() => {
              window.location.href = "/admin/addproduct";
            }}
            className="flex bg-custom-skin rounded-xl py-2 px-4  my-2"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <IoIosAddCircle className=" text-3xl text-custom-bg-footer" />
            </ListItemIcon>

            <h1 className=" ml-6 text-xl">Add Products</h1>
          </button>
          <button
            onClick={() => {
              window.location.href = "/admin/orders";
            }}
            className="flex bg-custom-skin rounded-xl py-2 px-4  my-2"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GiStack className=" text-3xl text-custom-bg-footer" />
            </ListItemIcon>

            <h1 className=" ml-6 text-xl">Orders</h1>
          </button>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div className=" flex ">
            <Chart />
            <div className="flex-col justify-center items-center w-full mx-4 p-4">
              <div className="w-full  p-4 bg-white rounded-lg shadow-md my-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Total Sales
                </h2>
                <div className="flex items-center  text-2xl font-bold text-gray-700">
                  <FaRupeeSign />
                  19,626,058.20
                </div>
              </div>
              <div className="w-full  p-4 bg-white rounded-lg shadow-md my-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Total Orders
                </h2>
                <div className="text-2xl font-bold text-gray-700">3290</div>
              </div>
              <div className="w-full  p-4 bg-white rounded-lg shadow-md my-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Total Products
                </h2>
                <div className="text-2xl font-bold text-gray-700">322</div>
              </div>
            </div>
          </div>
          {/* <CollapsibleTable /> */}
        </Box>
      </Box>
    </>
  );
}
