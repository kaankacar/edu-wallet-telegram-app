import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import QrScanner from 'react-qr-scanner';

const NETWORK_CONFIG = {
  name: 'Open Campus Codex Sepolia',
  rpcUrl: 'https://open-campus-codex-sepolia.drpc.org',
  chainId: '0xa045c',
  symbol: 'EDU',
  explorer: 'https://opencampus-codex.blockscout.com'
};

function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const setupProvider = async () => {
      const newProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
      setProvider(newProvider);
    };
    setupProvider();

    // Initialize Telegram Mini App
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  useEffect(() => {
    if (wallet && provider) {
      updateBalance();
    }
  }, [wallet, provider]);

  const updateBalance = useCallback(async () => {
    if (wallet && provider) {
      const balance = await provider.getBalance(wallet.address);
      setBalance(ethers.utils.formatEther(balance));
    }
  }, [wallet, provider]);

  const createWallet = () => {
    const newWallet = ethers.Wallet.createRandom().connect(provider);
    setWallet(newWallet);
    alert('New wallet created!');
  };

  const sendEDU = async () => {
    if (!wallet || !sendAddress || !sendAmount) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const tx = await wallet.sendTransaction({
        to: sendAddress,
        value: ethers.utils.parseEther(sendAmount)
      });
      await tx.wait();
      alert(`Sent ${sendAmount} EDU to ${sendAddress}`);
      updateBalance();
    } catch (error) {
      alert('Transaction failed: ' + error.message);
    }
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    alert('Wallet address copied to clipboard!');
  };

  const handleScan = (data) => {
    if (data) {
      setSendAddress(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    alert('QR scan error. Please try again.');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {!wallet ? (
        <button onClick={createWallet} className="w-full bg-blue-500 text-white p-2 rounded">
          Create New Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p>Balance: {balance} EDU</p>
            <p className="text-sm break-all">Address: {wallet.address}</p>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-500 text-white p-2 rounded">Send</button>
            <button onClick={() => setShowQR(true)} className="flex-1 bg-gray-200 p-2 rounded">Receive</button>
          </div>
          
          <div className="relative">
            <input
              className="w-full p-2 border rounded"
              placeholder="Enter recipient address"
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
            />
            <button 
              onClick={() => setShowScanner(true)}
              className="absolute right-2 top-2 text-blue-500"
            >
              📷
            </button>
          </div>
          
          <input
            className="w-full p-2 border rounded"
            type="number"
            placeholder="Amount to send"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          
          <button onClick={sendEDU} className="w-full bg-green-500 text-white p-2 rounded">
            Send EDU
          </button>
          
          <div className="flex justify-between">
            <button onClick={copyWalletAddress} className="bg-gray-200 p-2 rounded">
              Copy Address
            </button>
            <button onClick={() => setShowQR(true)} className="bg-gray-200 p-2 rounded">
              Show QR Code
            </button>
          </div>
          
          {showScanner && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded">
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                <button onClick={() => setShowScanner(false)} className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                  Close Scanner
                </button>
              </div>
            </div>
          )}
          
          {showQR && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded">
                <div className="text-center mb-2">Your Wallet QR Code</div>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${wallet.address}`} alt="Wallet QR Code" />
                <button onClick={() => setShowQR(false)} className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                  Close QR
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;