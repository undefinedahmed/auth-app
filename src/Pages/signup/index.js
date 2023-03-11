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
import Identifiers from "../../Components/Identifiers";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../Components/Snackbar";

const theme = createTheme();

export default function SignUp() {
  const [identifier, setIdentifier] = React.useState("");
  const [snackbarData, setSnackbarData] = React.useState({
    open: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();

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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      identifier,
    };
    console.log(dataObj);
  };

  const identifierChangeHandler = (name) => setIdentifier(name);
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
          <Avatar sx={{ m: 1, bgcolor: "#673ab7" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  margin="normal"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
            </Grid>
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
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
                    navigate("/login");
                  }}
                >
                  Already have an account? Login
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
