import {createTheme, Theme} from "@mui/material/styles";
import {green, purple} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: '#364979'
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
