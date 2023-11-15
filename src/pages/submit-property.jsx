import React, { useState } from 'react';
import SubmitPage from "../components/submit.css";
import ipfs from '../ipfs'; 
import { web3, contract } from '../web3';
import { useParams } from 'react-router-dom';

export const Submit = () => {
    const [propertyID, setPropertyID] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [LandSiza, setLandSize] = useState('');
  const [Supply, setInitialSupply] = useState(''); 
  const [Address, setAddress] = useState(''); 
  const [Symbol, setSymbol] = useState(''); 
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const { walletAddress } = useParams();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const imageBuffer = await file.arrayBuffer();
        const result = await ipfs.add({ content: imageBuffer });
        const initialSupply = web3.utils.toWei(Supply, 'ether'); // assuming Supply is in ether
 
        await contract.methods
          .submitAndCreateProperty(propertyID, Address, tokenName, Symbol, LandSiza, initialSupply, result.path)
          .send({ from: web3.currentProvider.selectedAddress });
  
        console.log('Property submitted and created successfully!');
      } catch (error) {
        console.error('Error submitting and creating property:', error);
      }
  };

  return (
    <div className="box">
      <div className="group">
        <div className="overlap">
        <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper-4"><a href="/home">PropertyChain</a></div>
              <div className="div"><a href={`/profile/${walletAddress}`}>My Profile</a></div>
              <div className="text-wrapper-6"><a href="/properties">Properties</a></div>
              <div className="text-wrapper-7"><a href="/submit">Submit Property</a></div>
              <div className="rectangle"><input className="searchput"></input></div>
            </div>
          </div>
          <form>
          <div className="rectangle-2">
          {imagePreview && <img  className='preview' src={imagePreview} alt="Image Preview"/>}
          <label>Property Images</label>
                    <input className='img-input' 
                        type="file"
                        onChange={handleFileChange}
                    />
                 
          </div>
            
            <div className="text-wrapper"><label>Property ID</label><input className="property-name" type="text"
          value={propertyID}
          onChange={(e) => setPropertyID(e.target.value)}
          placeholder="Enter Property ID"></input></div>
          <div className="text-wrapper-2"><label>Adress</label><input className="address-description" type="text"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"></input></div>
          <div className="text-wrapper-3"><label>Land Size</label><input className="land-size" type="number"
          value={LandSiza}
          onChange={(e) => setLandSize(e.target.value)}
          placeholder="Enter Land Size"></input></div>
          <div className="text-wrapper1"><label>Token Name</label><input className="token-name" type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Enter Token Name"></input></div>
          <div className="text-wrapper2"><label>Symbol</label><input className="symbol" type="text"
          maxlength="3"
          value={Symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter Symbol Name"></input></div>
          <div className="text-wrapper3"><label>Supply</label><input className="initial-supply" type="number"
          value={Supply}
          onChange={(e) => setInitialSupply(e.target.value)}
          placeholder="Enter Initial Supply"></input></div>
          <div className="rectangle-6"><button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button></div>
          </form>
          
          
          
          
        </div>
      </div>
    </div>
  );
};
