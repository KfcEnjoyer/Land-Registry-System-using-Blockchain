import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { contract } from '../web3';
import Web3 from 'web3';
import '../components/Properties.css';

export const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { walletAddress } = useParams();
  const loadProperties = async () => {
    setIsLoading(true);
    try { 
      const moreProperties = await contract.methods.getAllProperties(page).call();
      setProperties((prevProperties) => [...prevProperties, ...moreProperties]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadProperties();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadProperties]);

  return (
    
          <div className="properties-list">
            <div className="overlap-group-wrapper">
            <div className="overlap-group">
            <div className="text-wrapper"><a href="/home">PropertyChain</a></div>
            <div className="div"><a href={`/profile/${walletAddress}`}>My Profile</a></div>
              <div className="text-wrapper-2"><a href="/properties">Properties</a></div>
              <div className="text-wrapper-3"><a href="/submit">Submit Property</a></div>
              <div className="rectangle"><input className="searchput"></input></div>
            </div>
          </div>
            <h2>Properties</h2>
            <table className='products-table'>
              
              <tbody>
          {properties.map((property) => (
            <tr key={property.propertyId}>
              <td><div className='div-image'>{<img className="IpfsImage" src={`https://ipfs.io/ipfs/${property.ipfsHash}` }></img>}</div></td>
              <td><p className='address-dedscription'>{property.addressDescription}</p></td>
              <td><p className='isverified'>{property.isVerified ? 'Verified' : 'Not Verified'}</p></td>
              <td><p className='owner-address'>{property.owner}</p></td>
              <td>
                <Link to={`/properties/${property.propertyId}`}><p className='details-page'>Details</p></Link>
              </td>
            </tr>
          ))}
        </tbody>
            </table>
            {isLoading && <p>Loading...</p>}
          </div>
        
  );
};

export default Properties;
