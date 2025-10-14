import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { AUTH_ENDPOINT, EVENTS_ENDPOINT } from "../config/api";

const MainLayout = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${EVENTS_ENDPOINT}`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        console.log(data);
        setEvents(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchDataUser = async () => {
      try {
        const response = await fetch(`${AUTH_ENDPOINT}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Something went wrong");
        const dataUser = await response.json();

        const res = await fetch(`${EVENTS_ENDPOINT}`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();

        setMyEvents(
          data.results.filter((event) => event.organizerId === dataUser.id)
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataUser();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        <Outlet context={{ events, myEvents }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
