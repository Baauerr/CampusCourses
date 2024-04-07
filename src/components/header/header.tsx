import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider, Grid, Box, Drawer } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { UserCourseBlock } from './headerCourses';
import { UserAccountBlock } from './userAccount';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
  },
});

const Head = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ backgroundColor: '#002C54' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}>
            Кампусные курсы
            <Grid sx={{ display: { lg: 'block', xs: 'none', md: 'none' } }}>
              <UserCourseBlock />
            </Grid>
          </Typography>
          <Box sx={{ display: { sm: 'block', lg: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Grid sx={{ display: { lg: 'block', xs: 'none', md: 'none' } }}>
            <UserAccountBlock />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Grid sx={{ marginBottom: "30px" }}>
            <UserCourseBlock />
          </Grid>
          <UserAccountBlock />
        </Box>
      </Drawer>
    </ThemeProvider >
  );
}





export default Head;

