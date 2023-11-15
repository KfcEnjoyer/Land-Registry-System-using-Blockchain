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

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

