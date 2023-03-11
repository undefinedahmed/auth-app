import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "../../api.js";
import CustomSnackbar from "../../Components/Snackbar/index.js";
import { useNavigate } from "react-router-dom";

import Identifiers from "../../Components/Identifiers/index.js";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [snackbarData, setSnackbarData] = React.useState({
    open: false,
    type: "",
    message: "",
  });
  const [identifier, setIdentifier] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!identifier) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: "Please select the identifier too!",
        type: "error",
      });
      return;
    }
    const data = new FormData(event.currentTarget);
    let dataObj = {
      email: data.get("email"),
      password: data.get("password"),
      identifier,
    };
    Axios.post("login", dataObj)
      .then((res) => {
        console.log("Resp", res.data);
        localStorage.setItem("token_auth", res.data.refreshToken);
        localStorage.setItem("token_auth_access", res.data.accessToken);
        setIdentifier("");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: e?.response?.data?.message || "Something Went Wrong!",
          type: "error",
        });
      });
  };

  const closeSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: !snackbarData.open });
  };

  const identifierChangeHandler = (name) => setIdentifier(name);

  // #e3f2fd
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#673ab7" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              color="secondary"
              focused
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              autoFocus
            />
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type="password"
            />
            <Identifiers
              selectedIdentifier={identifier}
              changeHandler={identifierChangeHandler}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: "#673ab7",
                textTransform: "capitalize",
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.9375rem",
                boxShadow: "none",
                fontWeight: "600",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#673ab7",
                },
              }}
            >
              Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    fontFamily: "Roboto, sans-serif",
                    lineHeight: "1.75",
                    color: "rgb(103, 58, 183)",
                    cursor: "pointer",
                  }}
                  variant="body2"
                >
                  Forgot password?
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    fontFamily: "Roboto, sans-serif",
                    lineHeight: "1.75",
                    color: "rgb(103, 58, 183)",
                    cursor: "pointer",
                  }}
                  variant="body2"
                  onClick={() => {
                    // history.push("/signup");
                    navigate("/sign-up");
                  }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <CustomSnackbar
        open={snackbarData.open}
        close={closeSnackbar}
        type={snackbarData.type}
        message={snackbarData.message}
      />
    </ThemeProvider>
  );
}
