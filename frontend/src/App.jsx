import { Route, Routes } from "react-router";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";

import UserEvents from "./users/UserEvents";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<UserEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/editEvent/:idToEdit" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
