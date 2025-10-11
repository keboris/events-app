import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/events");
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

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        <Outlet context={{ events }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
