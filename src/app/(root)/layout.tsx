'use client'
import Navbar from "@/components/navbar";
import WalletModal from "@/components/WalletModal";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setModalOpen] = useState(false);
  
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  return (
    <div>
      <Navbar openModal={openModal} />
      {children}
      <WalletModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
