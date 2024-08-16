import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Comments from "./pages/Comments";
import UpdateComment from "./pages/UpdateComments";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>{/* MainContent will be rendered by Layout */}</Layout>
        }
      />

      <Route
        path="/admin"
        element={
          <Layout>
            <Admin />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />

      <Route element={<PrivateRoute />}>
        <Route
          path="/comments"
          element={
            <Layout>
              <Comments />
            </Layout>
          }
        />
        <Route
          path="/updateComment/:commentId"
          element={
            <Layout>
              <UpdateComment />
            </Layout>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
