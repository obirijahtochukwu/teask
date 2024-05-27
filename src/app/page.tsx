"use client";
import React from "react";
import About from "@/components/components/About";
import Banner from "@/components/components/Banner";
import Faq from "@/components/components/Faq";
import Footer from "@/components/components/Footer";
import Header from "@/components/components/Header";
import Roadmap from "@/components/components/Roadmap";
import Tokenomics from "@/components/components/Tokenomics";
import Aos from "aos";
import { useEffect } from "react";
// import { Aos } from 'aos';
import "../assets/scss/style.scss";
import "aos/dist/aos.css";
export default function App() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);
  return (
    <>
      <Header />
      <Banner />
      <About />
      <Roadmap />
      <Tokenomics />
      <Faq />
      <Footer />
    </>
  );
}
