import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: '#6C55F9', // Purple primary
      light: '#8875fa',
      dark: '#5541c7',
    },
    secondary: {
      main: '#FF3D85', // Pink accent
      light: '#ff6499',
      dark: '#cc3069',
    },
    success: {
      main: '#35bb78', // Green success
    },
    info: {
      main: '#05B4E1', // Blue info
    },
    warning: {
      main: '#FAC14D', // Yellow warning
    },
    error: {
      main: '#FF4943', // Red danger
    },
    grey: {
      500: '#B4B2C5', // Grey
    },
    text: {
      primary: '#2D2B3A', // Dark
      secondary: '#645F88', // Secondary text
    },
    background: {
      default: '#F6F5FC', // Light background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Pill-shaped buttons
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 32px -4px rgba(108, 85, 249, 0.1)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(246, 245, 252, 0.8)', // Light background with opacity
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(180, 178, 197, 0.16)', // Using grey color
        },
      },
    },
  },
});

export default theme; 