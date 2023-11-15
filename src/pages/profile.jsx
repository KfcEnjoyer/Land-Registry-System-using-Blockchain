import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../components/profile.css";
import Web3 from 'web3';

export const Profile = () => {
    const nav = useNavigate();
    const { walletAddress } = useParams();
    const [data, setData] = useState({
        address: "",
        balance: 0,
    });

    useEffect(() => {
        const accountChangeHandler = async () => {
            try {
                window.web3 = new Web3(window.ethereum);
                // Request accounts from Metamask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0]; // Get the first account (wallet address)
    
                setData((prevData) => ({
                    ...prevData,
                    address: address,
                }));
    
                // Fetch the balance using the Ethereum provider
                let weiBalance = await window.web3.eth.getBalance(address);
                let ethBalance = window.web3.utils.fromWei(weiBalance, "ether");
                console.log(await window.web3.eth.getBalance(address));
                setData((prevData) => ({
                    ...prevData,
                    balance: ethBalance,
                }));
            } catch (error) {
                console.error('Error fetching account or balance:', error);
            }
        };
    
        accountChangeHandler(); // Call the handler when the component mounts
    
        // Listen for changes in the active account
        window.ethereum.on('accountsChanged', accountChangeHandler);
    }, [walletAddress]);

    return (
      <div className="pbox">
          <div className="pgroup">
              <div className="poverlap">
                  <div className="poverlap-group-wrapper">
                      <div className="poverlap-group">
                          <div className="ptext-wrapper"><a href="/home">PropertyChain</a></div>
                          <div className="pdiv"><a href={`/profile/${walletAddress}`}>My Profile</a></div>
                          <div className="ptext-wrapper-2"><a href="/properties">Properties</a></div>
                          <div className="ptext-wrapper-3"><a href="/submit">Submit Property</a></div>
                          <div className="prectangle"><input className="searchput"></input></div>
                      </div>
                  </div>
                  <div className="ptext-wrapper-5">
                      <p className="wallet-address">
                          wallet address: <b><a className='wallet-link' href={`https://goerli.etherscan.io/address/${data.address}`}>{data.address}</a></b>
                      </p>
                  </div>
                  {/* Use Link to navigate to the property list */}
                  <div className="ptext-wrapper-6">
                      <Link to={`/property-list/${data.address}`}><p>List of properties</p></Link>
                  </div>
                  <div className="pellipse" />
              </div>
          </div>
      </div>
  );
};
