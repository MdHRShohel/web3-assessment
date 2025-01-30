"use client";
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import TrezorConnect from '@trezor/connect-web';
import Image from 'next/image';
import React, { useState } from 'react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<string>('');

  const connectLedger = async () => {
    try {
      setStatus('Connecting to Ledger...');
      const transport = await TransportWebHID.create();
      await transport.open();
      setStatus('Connected to Ledger!');
    } catch (error) {
      setStatus('Failed to connect to Ledger.');
    }
  };

  const connectTrezor = async () => {
    try {
      setStatus('Connecting to Trezor...');
      await TrezorConnect.init({
        lazyLoad: true,
        manifest: {
          email: 'developer@xyz.com',
          appUrl: 'http://localhost:3002/'
        }
      });
      const result = await TrezorConnect.getPublicKey({ path: "m/44'/0'/0'/0/0" });
      if (result.success) {
        setStatus('Connected to Trezor!');
      } else {
        setStatus('Failed to connect to Trezor.');
      }
    } catch (error) {
      setStatus('Failed to connect to Trezor.');
    }
  };

  return (
    isOpen && (
      <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-max mx-auto">
          <h2 className="text-xl font-bold text-center text-white">Connect A Hardware Wallet</h2>
          <p className='text-white mt-2 mb-4 text-center'>Select a hardware wallet you would like to use with MetaMask.</p>
          <div className='flex gap-4'>
            <button
              className="bg-black p-20 rounded-lg"
              onClick={connectLedger}
            >
              <Image
                src="/images/ledger-wallet.svg"
                alt="Ledger Wallet"
                width={100}
                height={100}
              />
            </button>
            <button
              className="bg-black p-20 rounded-lg"
              onClick={connectTrezor}
            >
              <Image
                src="/images/trezor-wallet.svg"
                alt="Trezor Wallet"
                width={100}
                height={100}
              />
            </button>
          </div>
          <p className="text-gray-400 text-center mt-2 mb-4">{status}</p>
          <button
            className="w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default WalletModal;