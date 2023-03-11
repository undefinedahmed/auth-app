import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "../../api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import SimpleBackdrop from "../../Components/Loader";
import MaleAvatar from "../../Assets/male.png";
import FemaleAvatar from "../../Assets/female.png";

const theme = createTheme();

const Home = () => {
  const [userData, setUserData] = React.useState({
    firstName: "Ahmed",
    lastName: "Anis",
    gender: "male",
    email: "m.ahmed@gmail.com",
    phone: "123456789",
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Inside home");
    // getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);

    const config = {
      headers: {
        authorization: localStorage.getItem("token_auth_access"),
      },
    };
    Axios.get("get-user-data", config)
      .then((res) => {
        if (res.status === 200) {
          stopLoading();
          setUserData(res.data);
        }
      })
      .catch((e) => {
        stopLoading();
        console.log("Error from get user data", e);
      });
  };

  const getAccessToken = () => {
    setLoading(true);
    let token = localStorage.getItem("token_auth");
    Axios.post("access-token", { token })
      .then((res) => {
        stopLoading();
        console.log(res);
        localStorage.setItem("token_auth_access", res.data.accessToken);
        if (res.data.accessToken) {
          getUserData();
        }
      })
      .catch((e) => {
        stopLoading();
        console.log("Error from get access token", e);
      });
  };

  const stopLoading = () => setLoading(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userData ? (
            <>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 700,
                  borderLeft: "8px solid #673ab7",
                  borderRadius: "0.5rem",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 250 }}
                  image={userData.gender === "male" ? MaleAvatar : FemaleAvatar}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userData.email}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {userData.phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("token_auth");
                        localStorage.removeItem("token_auth_access");
                        window.location.reload();
                      }}
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
                      Logout
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h3"
                sx={{ margin: "1rem 0 0rem 0", fontWeight: "bold" }}
              >
                Invalid <span style={{ color: "#673ab7" }}>Token</span>
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                sx={{ margin: "1rem 0 2rem 0" }}
              >
                Click The Below Button To Get New Token
              </Typography>
              <Button
                onClick={getAccessToken}
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
                Get Access Token
              </Button>
            </>
          )}
        </Box>
      </Container>
      <SimpleBackdrop open={loading} close={stopLoading} />
    </ThemeProvider>
  );
};

export default Home;
