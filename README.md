# PropertyChain Project

PropertyChain is a decentralized application (DApp) for managing property ownership and transactions using blockchain technology. It is built on the Ethereum blockchain and allows users to submit, verify, and transfer property ownership seamlessly.

## Features

- **Property Submission:** Property owners can submit their properties to the blockchain, creating a unique representation of each property.

- **Ownership Transfer:** Owners can transfer the ownership of a property to another Ethereum wallet address.

- **Verification:** Properties can be marked as verified after real-world verification.

- **Property Token:** Each property is associated with an ERC-20 token, allowing for the representation of ownership and transfer.

- **Profile:** Users can view their profile, including their wallet address, balance, and a list of owned properties.

- **Property List:** A page to view the list of properties owned by a specific wallet address.

## Technologies Used

- **Smart Contracts:** Solidity, OpenZeppelin library.
  
- **Frontend:** React.js, React Router, Web3.js.

- **Blockchain:** Ethereum.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/property-chain.git
    cd property-chain
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. **Submit Property:**
   - Navigate to the "Submit Property" page.
   - Fill in the property details and submit.

2. **Transfer Ownership:**
   - Navigate to your profile.
   - Click on a property and transfer ownership by providing the recipient's wallet address.

3. **Verify Property:**
   - Only the contract owner can mark a property as verified.

4. **View Properties:**
   - Visit the "Properties" page to see a list of all properties.
   - Visit the "Property List" page and enter a wallet address to see properties owned by that address.

## Solidity Smart Contracts

The PropertyChain project uses Solidity smart contracts to manage property ownership and transactions on the Ethereum blockchain. Below is an overview of the main smart contracts used in this project:

### `PropertyToken.sol`

This contract represents an ERC-20 token for each property. Each property on the PropertyChain is associated with its unique ERC-20 token, allowing for ownership transfer and other token-related functionalities.

#### Functions:

- `getTokenName()`: Returns the name of the ERC-20 token.
- `getTokenSymbol()`: Returns the symbol of the ERC-20 token.
- `mint(address account, uint256 amount)`: Mints new tokens and assigns them to the specified account. Only the contract owner can call this function.

### `LandRegistry.sol`

The `LandRegistry` contract manages properties, their ownership, and verification status.

#### Struct:

- `Property`: Represents a property on the PropertyChain, containing information such as owner, address description, verification status, initial token supply, land size, and IPFS hash.

#### Functions:

- `submitAndCreateProperty(...)`: Submits a new property to the registry. Only the contract owner can call this function.
- `markAsVerified(uint256 propertyId)`: Marks a property as verified after real-world verification. Only the contract owner can call this function.
- `transferOwnership(uint256 propertyId, address newOwner)`: Transfers ownership of a property to a new owner. Only the current owner can call this function.
- `getAllProperties()`: Returns an array of all properties on the PropertyChain.
- `getPropertyTokenAddress(uint256 propertyId)`: Returns the ERC-20 token address associated with a specific property.
- `getPropertyTokenInfo(uint256 propertyId)`: Returns information about the ERC-20 token associated with a specific property, including name, symbol, and IPFS hash.

### `Modifiers`:

- `onlyPropertyOwner(uint256 propertyId)`: Ensures that only the current property owner can execute the function.

Feel free to explore the Solidity code in the `contracts` directory for more details.

## License

This project is licensed under the [MIT License](LICENSE).


## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

