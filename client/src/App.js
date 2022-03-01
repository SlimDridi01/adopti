import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Nav from "./components/navbar/Nav";
import Profile from "./components/profile/Profile";
import PrivateRoute, { AdminRoute } from "./components/private/PrivateRoute";
import Editprofile from "./components/profile/Editprofile";
import Admin from "./components/profile/Admin";
import Manage from "./components/profile/Manage";
import Browse from "./components/Browse/Browse";
import Addpet from "./components/Add/Addpet";
import EditPet from "./components/Add/EditPet";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Edit" element={<Editprofile />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Add" element={<Addpet />} />
        <Route path="/EditPet/:id" element={<EditPet />} />
        <Route path="/Admin" element={<Admin />} />

        <Route
          path="/Manage"
          element={
            <AdminRoute>
              {" "}
              <Manage />
            </AdminRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
