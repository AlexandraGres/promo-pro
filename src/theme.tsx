import { ThemeOptions, createTheme } from '@mui/material/styles';

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
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          color: '#6F7C8B80',
          textTransform: 'none',
          '&.Mui-selected': {
            color: '#1943EF',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '50%',
          left: '50%',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
