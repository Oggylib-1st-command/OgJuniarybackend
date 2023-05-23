import { createTheme } from "@mui/material/styles";

function MuiColor() {
  const theme = createTheme({
    palette: {
      orange: {
        main: "#fff672",
      },
    },
  });
  return theme;
}

export default MuiColor;
