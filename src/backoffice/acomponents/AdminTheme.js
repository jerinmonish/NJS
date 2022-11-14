import * as React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SideBar from './SideBar';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HeaderSideMenu from './HeaderSideMenu';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { purple } from '@mui/material/colors';

const drawerWidth = 240;
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminTheme({ children }) {
  const theme = useTheme();
  const [mode, setMode] = React.useState((sessionStorage.getItem("mode") && sessionStorage.getItem("mode") ? sessionStorage.getItem("mode") : 'light'));

  const theme2 = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          /*background: {
            default: '#3f51b5'
          }*/
          primary: {
            main: purple[500],
            // contrastText: yellow[500],
          },
        },
      }),
    [mode],
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        let mde = (mode == 'light') ? 'dark' : 'light';
        sessionStorage.setItem("mode", mde);
      },
    }),
    [mode],
  );
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme2}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: "purple" }}>
              <Toolbar>
                <Grid container>
                  <Grid item xs={10}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                  </Typography> */}
                  </Grid>
                  <Grid item xs={1}>
                    <>
                      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" title={theme2.palette.mode + " mode"}>
                        {theme2.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                      </IconButton></>
                  </Grid>
                  <Grid item xs={1}>
                    <><HeaderSideMenu /></>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <Typography variant="h6" noWrap component="div">
                  <Link to={'/admin/dashboard'}>
                    DBC Commerce
                  </Link>
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <SideBar />
            </Drawer>
            <Main open={open}>
              <DrawerHeader />
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {children}
              </Paper>

            </Main>
            <footer style={{
              bottom: '0',
              width: "100%",
              textAlign: 'center',
              backgroundColor: 'purple',
              color: 'white',
              position: "fixed",
              height: "40px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <p>&copy; 2022 All Rights Reserved</p>
            </footer>
          </Box >
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
