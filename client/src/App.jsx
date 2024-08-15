import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

const App = () => (
  <BrowserRouter>
    <Layout />
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
