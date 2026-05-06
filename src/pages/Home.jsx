import React from "react";
import Navbar from "../components/home/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Features from "../components/home/Features.jsx";
import FAQ from "../components/home/FAQ.jsx";
import Team from "../components/home/Team.jsx";
import Footer from "../components/home/Footer.jsx";
import ToolLogos from "@/components/home/ToolLogos.jsx";

const Home = () => {
  return (
    <div className="home-shell">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <ToolLogos />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
