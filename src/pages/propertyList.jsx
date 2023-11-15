import React, { useState, useEffect } from 'react';
import { contract } from '../web3';
import { useParams } from 'react-router-dom';
import web3 from 'web3';
import '../components/propertylist.css'

const PropertyList = () => {
    const [ownerProperties, setOwnerProperties] = useState([]);
    const { walletAddress } = useParams(); // Use useParams to get the wallet address

    useEffect(() => {
        const getProperties = async () => {
            try {
                // Fetch properties based on the wallet address
                const result = await contract.methods.getPropertiesByOwner(walletAddress).call();

                // Update the state with the fetched properties
                setOwnerProperties(result);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        getProperties();
    }, [walletAddress]); // Include walletAddress in the dependency array

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
            <h2>Properties Owned by {walletAddress}</h2>
            <ul className='property-list'>
                {ownerProperties.map((property, index) => (
                    <li key={index}>
                    <p>Property ID: {parseInt(property.propertyId)}</p>
                    <p>Address Description: {property.addressDescription}</p>
                    <p>Is Verified: {property.isVerified ? 'Yes' : 'No'}</p>
                    <p>Initial Token Supply: {web3.utils.fromWei(property.initialTokenSupply, 'ether')}</p>
                    <p>Land Size: {parseInt(property.landSize)}</p>
                    <p>IPFS Hash: {property.ipfsHash}</p>
                    {/* Add more details as needed */}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
