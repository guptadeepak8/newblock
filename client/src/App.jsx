import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function initWeb3() {
      if (typeof window.ethereum !== 'undefined') {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } catch (e) {
          console.error(e);
        }
      } else if (typeof window.web3 !== 'undefined') {
        setWeb3(new Web3(window.web3.currentProvider));
      } else {
        setWeb3(new Web3('http://localhost:7545'));
      }
    }
    initWeb3();
  }, []);

  return (
    <div >
       <Navbar/>
       <Outlet/>
    </div>
  )
}

export default App
