import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { contract } from '../web3';
import Web3 from 'web3';
import '../components/propdetails.css';

export const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({ tokenName: '', tokenSymbol: '', ipfsHash: '' });
  const [tokenContractAddress, setTokenContractAddress] = useState('');
  const { walletAddress } = useParams();
  useEffect(() => {
    const getPropertyTokenAddress = async () => {
        try {
          const result = await contract.methods.getPropertyTokenAddress(propertyId).call();

          setTokenContractAddress(result);
        } catch (error) {
          console.error('Error fetching token contract address:', error);
        }
      };
    const getPropertyTokenInfo = async () => {
      try {
        const result = await contract.methods.getPropertyTokenInfo(propertyId).call();
        setProperty({
          tokenName: result[0],
          tokenSymbol: result[1],
          ipfsHash: result[2],
        });
      } catch (error) {
        console.error('Error fetching token info:', error);
      }
    };
    getPropertyTokenAddress();
    getPropertyTokenInfo();
  }, [propertyId]);

  
  return (
    <div>
      <div className="overlap-group-wrapper">
            <div className="overlap-group">
            <div className="text-wrapper"><a href="/home">PropertyChain</a></div>
            <div className="div"><a href={`/profile/${walletAddress}`}>My Profile</a></div>
              <div className="text-wrapper-2"><a href="/properties">Properties</a></div>
              <div className="text-wrapper-3"><a href="/submit">Submit Property</a></div>
              <div className="rectangle"><input className="searchput"></input></div>
            </div>
          </div>
      <h2 className='details'>Property Details</h2>
      <div className='imgdiv'><img className="IpfsImage"src={`https://ipfs.io/ipfs/${property.ipfsHash}`}></img></div>
      <p className='token-name-details'>Token Name: {property.tokenName}</p>
      <p className='token-symbol'>Token Symbol: {property.tokenSymbol}</p>
      <p className='token-address'>Token Address: <a className='etherscan-address' href={`https://goerli.etherscan.io/address/${tokenContractAddress}`}>{tokenContractAddress}</a></p>
    </div>
  );
};
