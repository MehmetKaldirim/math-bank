import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => (
  <BrowserRouter>
    <Layout />
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
