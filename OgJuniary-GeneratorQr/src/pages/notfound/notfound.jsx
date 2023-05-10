import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: { xs: "320px", sm: "450px" },
          height: { xs: "320px", sm: "450px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(255,255,255,0.7)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "150px", sm: "200px" },
            fontFamily: "Passion One",
            color: "#34303e",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "20px", sm: "25px" }, marginBottom: "15px" }}
        >
          OOPS! PAGE NOT FOUND
        </Typography>
        <Button variant="contained">
          <Link style={{ color: "white" }} to={navigate(-1)}>
            Back to home
          </Link>
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
