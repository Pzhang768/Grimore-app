import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4B5563',
      light: '#6B7280',
      dark: '#374151',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00D4AA',
      light: '#33DDBB',
      dark: '#00A885',
      contrastText: '#000000',
    },
    error: {
      main: '#FF4757',
      light: '#FF6B78',
      dark: '#CC3344',
    },
    warning: {
      main: '#FFB020',
      light: '#FFC84D',
      dark: '#CC8C1A',
    },
    background: {
      default: '#0D0B1E',
      paper: '#1A1635',
    },
    divider: '#2D2852',
    text: {
      primary: '#F0EEFF',
      secondary: '#9490B8',
      disabled: '#4A4770',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
