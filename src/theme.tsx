import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#4c6fff',
    },
    secondary: {
      main: '#6f7c8b',
    },
    background: {
      default: '#f5f6f7',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: 18,
          padding: 12,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          color: '#1a1e2c',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
