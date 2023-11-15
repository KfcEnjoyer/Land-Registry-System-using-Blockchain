import React, {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import "../components/signin.css";


export const Signin = () => {
    const nav = useNavigate();
  const [address, setAddress] = useState(''); // State to store the Ethereum wallet address
  const [loggedIn, setLoggedIn] = useState(false);
  const { walletAddress } = useParams();

  const handleSignIn = async (provider) => {
    if (provider === 'metamask') {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(accounts[0]);
          setLoggedIn(true);
          nav('/profile')
        } catch (error) {
          console.error(error);
          
        }
      } else {
        alert('Please install Metamask to sign in.');
      }
    }
  };

  return (
    <div className="sbox">
      <div className="sgroup">
        <div className="soverlap">
          <div className="soverlap-group-wrapper">
            <div className="soverlap-group">
            <div className="stext-wrapper"><a href="/home">PropertyChain</a></div>
            <div className="sdiv"><a href={`/profile/${walletAddress}`}>My Profile</a></div>
              <div className="stext-wrapper-2"><a href="/properties">Properties</a></div>
              <div className="stext-wrapper-3"><a href="/submit">Submit Property</a></div>
              <div className="srectangle"><input className="searchput"></input></div>
            </div>
          </div>
          <div className="soverlap-2">
            <div className="ssign-in">Sign In</div>
            <div className="srectangle-2"><button className='metamask-button' onClick={() => handleSignIn('metamask')}>Sign In with Metamask</button> </div>
          </div>
        </div>
      </div>
    </div>
  );
};
