import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "../../api";
import { Button } from "@mui/material";

const theme = createTheme();

const Home = () => {
  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    console.log("Inside home");
    // getUserData();
  }, []);

  const getUserData = async () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token_auth_access"),
      },
    };
    Axios.get("get-fake-users", config)
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const getAccessToken = () => {
    let token = localStorage.getItem("token_auth");
    Axios.post("access-token", { token })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token_auth_access", res.data.accessToken);
        if (res.data.accessToken) {
          getUserData();
        }
      })
      .catch((e) => console.log(e));
  };

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
          {userData && userData.length > 0 ? (
            <>
              <Typography component="h1" variant="h5">
                User Data
              </Typography>
              <TableContainer>
                <Table
                  sx={{
                    minWidth: 650,
                    mt: 4,
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Website</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.map((each) => (
                      <TableRow
                        key={each.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {each.name}
                        </TableCell>
                        <TableCell align="right">{each.email}</TableCell>
                        <TableCell align="right">{each.phone}</TableCell>
                        <TableCell align="right">{each.website}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Token Invalid, Click The Below Button To Get New Token
              </Typography>
              <Button
                onClick={getAccessToken}
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
                Get Access Token
              </Button>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
