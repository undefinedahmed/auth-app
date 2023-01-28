import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "../../api.js";
import CustomSnackbar from "../../Components/Snackbar/index.js";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const [snackbarData, setSnackbarData] = React.useState({
    open: false,
    type: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataObj = {
      email: data.get("email"),
      password: data.get("password"),
    };
    Axios.post("login", dataObj)
      .then((res) => {
        console.log("Resp", res.data);
        localStorage.setItem("token_auth", res.data.refreshToken);
        localStorage.setItem("token_auth_access", res.data.accessToken);
        history.goBack("/");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
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
