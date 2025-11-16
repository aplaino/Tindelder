import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import {useState} from "react"
import Deck from "./pages/Deck";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import AuthRegister from "./pages/AuthRegister.tsx";
import AuthSignIn from "./pages/AuthSignIn.tsx";

function App() {
  const [accessToken, setAccessToken] = useState("")
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="deck" element={<Deck />} />
        <Route path="match" element={<Matches />} />
        <Route path="profile" element={<Profile accessToken={accessToken} />} />
        <Route
          path="authRegister"
          element={<AuthRegister setAccessToken={setAccessToken} />}
        />
        <Route
          path="authSignIn"
          element={<AuthSignIn setAccessToken={setAccessToken} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
