import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Single source of truth for typography.
// Font weights — use these tokens, never the string "bold" or stray numbers.
const FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';
const WEIGHT = { regular: 400, medium: 500, semibold: 600, bold: 700 };

let theme = createTheme({
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
  // A modular type scale (~1.25 ratio, 16px base). Desktop sizes are declared
  // here; responsiveFontSizes() below auto-generates the smaller breakpoints,
  // so pages should NOT set fontSize inline — pick the right variant instead.
  typography: {
    fontFamily: FONT_FAMILY,
    h1: {
      fontSize: '3.5rem',
      fontWeight: WEIGHT.bold,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: WEIGHT.bold,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: WEIGHT.bold,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: WEIGHT.bold,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: WEIGHT.semibold,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.0625rem',
      fontWeight: WEIGHT.semibold,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: WEIGHT.regular,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.9375rem',
      fontWeight: WEIGHT.semibold,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: WEIGHT.regular,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.9375rem',
      fontWeight: WEIGHT.regular,
      lineHeight: 1.65,
    },
    button: {
      fontSize: '1rem',
      fontWeight: WEIGHT.semibold,
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.8125rem',
      fontWeight: WEIGHT.regular,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: WEIGHT.bold,
      lineHeight: 2,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
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
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollPaddingTop: 72,
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

// Auto-scale every text variant down at sm/xs so headings stay readable on
// mobile without per-page media queries or inline { xs, md } fontSize objects.
theme = responsiveFontSizes(theme, { factor: 2.2 });

export default theme; 