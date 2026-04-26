import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    cta: true
    ghost: true
    navGhost: true
  }
}

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
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#F0EEFF',
          fontSize: 14,
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: 'cta' },
          style: {
            backgroundColor: '#00D4AA',
            color: '#001612',
            fontWeight: 600,
            fontSize: 15,
            padding: '12px 22px',
            borderRadius: '10px',
            boxShadow: '0 0 24px -4px rgba(0,212,170,0.53)',
            '&:hover': {
              backgroundColor: '#00BF99',
              boxShadow: '0 0 32px -4px rgba(0,212,170,0.7)',
            },
          },
        },
        {
          props: { variant: 'ghost' },
          style: {
            backgroundColor: 'transparent',
            color: '#F0EEFF',
            fontWeight: 600,
            fontSize: 15,
            padding: '12px 18px',
            borderRadius: '10px',
            border: '1px solid #2D2852',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderColor: '#4A4470',
            },
          },
        },
        {
          props: { variant: 'navGhost' },
          style: {
            backgroundColor: '#1A1635',
            color: '#F0EEFF',
            fontWeight: 600,
            fontSize: 14,
            border: '1px solid #2D2852',
            '&:hover': {
              backgroundColor: '#221D42',
              borderColor: '#4A4470',
            },
          },
        },
      ],
    },
  },
})

export default theme
