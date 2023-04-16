import React, { Component, useEffect,useState } from "react";
import Web3 from "web3";
import WalletFactory from "../proxies/WalletFactory";
import Wallet from "../proxies/Wallet";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Loading";

function Main() {
  const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [load,setLoad]=useState(false)
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    updateWallets();
  }, []);

  const onWithdrawEther = async (walletInstance, sender) => {
    try {
      const result = await walletInstance.methods
        .releaseEther()
        .send({ from: sender });
      updateWallets();
      toast.success('Ether withdraw Sucessfully ', {position: "top-right",autoClose:3000,hideProgressBar: false, closeOnClick: true,pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } catch (err) {
      toast.error('No ether to withdraw', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      console.log(err);
    }
  };

  const onWithdrawToken = async (walletInstance, sender) => {
    try {
      const result = await walletInstance.methods
        .releaseToken()
        .send({ from: sender });
      updateWallets();
      toast.success('Token withdraw Sucessfully ', {position: "top-right",autoClose:3000,hideProgressBar: false, closeOnClick: true,pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } catch (err) {
      console.log(err);
      toast.error('No token to withdraw', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    
    }
  };

  const updateWallets = async () => {
    setLoad(true)
    try {
      const sender = await web3.eth.getCoinbase();
      const walletList = await WalletFactory.methods
        .getWalletList(sender)
        .call({ from: sender });

      const renderData = await Promise.all(
        walletList.map(async (wallet) => {
          const walletInstance = Wallet(wallet);
          const walletDetails = await walletInstance.methods
            .getWalletDetails()
            .call({ from: sender });
          const [
            beneficiary,
            creator,
            releaseTime,
            createdTime,
            etherAmount,
            tokenAmount,
          ] = Object.values(walletDetails);

          const eth = web3.utils.fromWei(etherAmount, "ether");
          const ashToken = web3.utils.fromWei(tokenAmount, "ether");
          const releaseDateTime = new Date(releaseTime * 1000).toLocaleString();
          const createdDateTime = new Date(createdTime * 1000).toLocaleString();

          return (
            <tr key={wallet}>
              <td className="center">{wallet}</td>
              <td className="center">{creator}</td>
              <td className="center">{createdDateTime}</td>
              <td className="center">{releaseDateTime}</td>
              <td className="center">{eth}</td>
              <td className="center">{ashToken}</td>

              <td className="center">
                <button
                  type="submit"
                  className="custom-btn login-btn"
                  onClick={() =>
                    onWithdrawEther(walletInstance, sender)
                  }
                >
                  Withdraw Ether
                </button>
              </td>
              <td className="center">
                <button
                  type="submit"
                  className="custom-btn login-btn"
                  onClick={() =>
                    onWithdrawToken(walletInstance, sender)
                  }
                >
                  Withdraw Token
                </button>
              </td>
            </tr>
          );
        })
      );

      setWallets(renderData);
      setWallet(walletList[0]);
      setLoad(false)
      
    } catch (e) {
      console.log("console err", e, e.reason);
    }
  };

 if(load){
  return(
    <>
      <Loading/>
    </>
  )
 }

  return (

    <div className=" card-panel">
        <ToastContainer/>
      <h4 className="center">Claim Funds</h4>
      <table id="requests" className="responsive-table striped">
        <thead>
          <tr>
            <th key="wallet" className="center">
              Wallet
            </th>
            <th key="from" className="center">
              From
            </th>
            <th key="age" className="center">
              Created Time
            </th>
            <th key="unlockin" className="center">
              Release Time
            </th>
            <th key="ether" className="center">
              Ether
            </th>
            <th key="token" className="center">
              ASH Token
            </th>
            <th key="withdrawEther" className="center">
              Withdraw Ether
            </th>
            <th key="withdrawToken" className="center">
              Withdraw Token
            </th>
          </tr>
        </thead>
        <tbody className="striped highlight">{wallets}</tbody>
      </table>
    </div>
  );


}


export default Main;
