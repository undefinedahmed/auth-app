import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import SignUp from "./Pages/signup";

function App() {
  const isAuthenticated = () => {
    let token = localStorage.getItem("token_auth");
    if (token) return true;
    return false;
    // return true;
  };

  function PageNotFound() {
    return (
      <div style={{ fontSize: "3rem", textAlign: "center" }}>
        404! Page Not Found
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-up"
          element={isAuthenticated() ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={!isAuthenticated() ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/home"
          element={!isAuthenticated() ? <Navigate to="/login" /> : <Home />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
