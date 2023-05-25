import { createTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";

const rawTheme = createTheme({
  palette: {
    primary: {
      main: "#28282a",
    },
    secondary: {
      main: "#ff3366",
    },
    warning: {
      main: "#ffc071",
    },
    error: {
      main: red[500],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: "uppercase",

};

const theme = createTheme(rawTheme, {
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "subtitle1",
          body1: "body1",
          body2: "body2",
        },
      },
      styleOverrides: {
        h1: {
          ...fontHeader,
          fontSize: 60,
        },
        h2: {
          ...fontHeader,
          fontSize: 48,
        },
        h3: {
          ...fontHeader,
          fontSize: 42,
        },
        h4: {
          ...fontHeader,
          fontSize: 36,
        },
        h5: {
          fontSize: 20,
          fontWeight: rawTheme.typography.fontWeightLight,
        },
        h6: {
          ...fontHeader,
          fontSize: 18,
        },
        subtitle1: {
          fontSize: 18,
        },
        body1: {
          fontWeight: rawTheme.typography.fontWeightRegular,
          fontSize: 16,
        },
        body2: {
          fontSize: 14,
        },
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
});

export default theme;
