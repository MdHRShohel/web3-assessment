"use client"
import Navbar from "@/components/navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Collection";
import Footer from "@/components/Footer";
import { useState } from "react";
import WalletModal from "@/components/WalletModal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  return (
    <div className="min-w-full bg-red-50">
      <Navbar openModal={openModal} />
      <Hero />
      <Features />
      <div className="min-h-screen bg-black"></div>
      <Footer />
      <WalletModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
