import React, { useState } from 'react';
import Web3 from 'web3';
import walletFactory from '../proxies/WalletFactory';
import tokenInstance from '../proxies/Token';
import Wallet from '../proxies/Wallet';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const intial={
  receiver: '',
      unlockDate: '',
      ether: '',
      token: '',
}
function Creates (){
 
const navigate=useNavigate()
  const [data,setData]=useState(intial)

  const web3 = new Web3(window.ethereum);

  const onCreateWallet=async(e)=>{
    try {
      e.preventDefault();
      const sender = await web3.eth.getCoinbase();
      const { receiver, unlockDate, token, ether } = data;
      console.log('console wallefactory', tokenInstance);
      const result = await walletFactory.methods.createNewWallet(tokenInstance._address, receiver, new Date(unlockDate).getTime() / 1000).send({from: sender,gas: 6700000,});
      const walletAddress = result.events.Created.returnValues['wallet'];
      if (ether) {
        const walletInstance = Wallet(walletAddress);
        await walletInstance.methods.depositEther().send({ from: sender, gas: 670000, value: web3.utils.toWei(ether, 'ether') });
      }
      if (token) {
        await tokenInstance.methods.transfer(walletAddress, web3.utils.toWei(token, 'ether')).send({ from: sender, gas: 670000 });
      }
      toast.success('wallet Created sucessfully ', {position: "top-right",autoClose:3000,hideProgressBar: false, closeOnClick: true,pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } catch (err) {
      console.log('console err', err);
      toast.error('Something went wrong', {
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
  
    setData(intial)
  }


  const inputChangedHandler = (e) => {
   const {name,value}=e.target
    setData({...data,
      [name]:value
    });
  }

  return(

<div className="container center" >
  <ToastContainer/>
<div className="row">
  <div className="container ">
    <div className="container ">
      <h5 style={{ padding: "30px 0px 0px 10px" }}>Create Wallet</h5>
      <form  onSubmit={onCreateWallet}>
        <label className="left">Beneficiary Address</label><input id="receiver" className="validate" placeholder="Beneficiary" type="text" name="receiver" onChange={inputChangedHandler} value={data.receiver}/><br /><br />
        <label className="left">Ether Amount</label><input id="ether"  placeholder="Ether Amount" type="text" className="validate input-control" name="ether" onChange={inputChangedHandler} value={data.ether}/><br /><br />
        <label className="left">ASH Token</label><input id="token" placeholder="ASH Token Amount" type="text" className="input-control" name="token" onChange={inputChangedHandler} value={data.token}/><br /><br />
        <label className="left">Release Time</label><input id="unlock" placeholder="Unlock Time" className="input-control" name="unlockDate" type="datetime-local" onChange={inputChangedHandler} value={data.unlockDate}></input><br /><br />

        <button type="submit" className="custom-btn login-btn">Create Wallet</button>
      </form>
    </div>
  </div>
</div>

</div >

  )
}

// class Create extends Component {
//   constructor() {
//     super();
//     this.state = {
//       receiver: null,
//       unlockDate: null,
//       ether: 0,
//       token: 0,
//     }

//     web3 = new Web3(window.ethereum);
//   }

//   onCreateWallet = async (e) => {
//     try {
//       e.preventDefault();
//       const sender = await web3.eth.getCoinbase();
//       const { receiver, unlockDate, token, ether } = this.state;
//       console.log('console wallefactory', tokenInstance);
//       const result = await walletFactory.methods.createNewWallet(tokenInstance._address, receiver, new Date(unlockDate).getTime() / 1000).send({
//         from: sender,
//         gas: 6700000,
//       });

    

//       const walletAddress = result.events.Created.returnValues['wallet'];
//       if (ether) {
//         const walletInstance = Wallet(walletAddress);
//         await walletInstance.methods.depositEther().send({ from: sender, gas: 670000, value: web3.utils.toWei(ether, 'ether') });

//       }

//       if (token) {
//         await tokenInstance.methods.transfer(walletAddress, web3.utils.toWei(token, 'ether')).send({ from: sender, gas: 670000 });
//       }
//     } catch (err) {
//       console.log('console err', err);
//     }
//   }

//   inputChangedHandler = (e) => {
//     const state = this.state;
//     state[e.target.name] = e.target.value;
//     this.setState(state);
//   }

//   render() {
//     return (
//       <div className="container center" >

//         <div className="row">
//           <div className="container ">
//             <div className="container ">
//               <h5 style={{ padding: "30px 0px 0px 10px" }}>Create Wallet</h5>
//               <form  onSubmit={this.onCreateWallet}>
//                 <label className="left">Beneficiary Address</label><input id="receiver" className="validate" placeholder="Beneficiary" type="text" name="receiver" onChange={this.inputChangedHandler} /><br /><br />
//                 <label className="left">Ether Amount</label><input id="ether"  placeholder="Ether Amount" type="text" className="validate input-control" name="ether" onChange={this.inputChangedHandler} /><br /><br />
//                 <label className="left">ASH Token</label><input id="token" placeholder="ASH Token Amount" type="text" className="input-control" name="token" onChange={this.inputChangedHandler} /><br /><br />
//                 <label className="left">Release Time</label><input id="unlock" placeholder="Unlock Time" className="input-control" name="unlockDate" type="datetime-local" onChange={this.inputChangedHandler}></input><br /><br />

//                 <button type="submit" className="custom-btn login-btn">Create Wallet</button>
//               </form>
//             </div>
//           </div>
//         </div>

//       </div >

//     )
//   }
// }




export default Creates;