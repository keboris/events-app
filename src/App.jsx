import { Route, Routes } from "react-router";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
