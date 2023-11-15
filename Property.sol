// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyToken is ERC20, Ownable(msg.sender) {
        constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

        function getTokenName() external view returns (string memory) {
            return name();
        }

        function getTokenSymbol() external view returns (string memory) {
            return symbol();
        }

        function mint(address account, uint256 amount) external onlyOwner {
            _mint(account, amount);
        }
    }

contract LandRegistry is Ownable(msg.sender) {

    struct Property {
        uint256 propertyId;
        address owner;
        string addressDescription;
        bool isVerified;
        uint256 initialTokenSupply; 
        uint256 landSize;    
        string ipfsHash;
    }

    // Mapping of property ID to Property
    mapping(uint256 => Property) public properties;
    uint256 public totalProperties;

    // Mapping of property ID to ERC20 token contract address
    mapping(uint256 => address) public propertyTokens;
    mapping(address => uint256[]) private ownerToProperties;
    // Event emitted when ownership is transferred
    event OwnershipTransferred(uint256 propertyId, address previousOwner, address newOwner);

    // ERC20 property token contract
    PropertyToken public propertyTokenContract;

    // Modifier to check if the sender is the owner of the property
    modifier onlyPropertyOwner(uint256 propertyId) {
        require(properties[propertyId].owner == msg.sender, "You are not the owner");
        _;
    }

    function getPropertiesByOwner(address owner) external view returns (Property[] memory) {
        uint256[] memory propertyIds = ownerToProperties[owner];
        Property[] memory ownerProperties = new Property[](propertyIds.length);

        for (uint256 i = 0; i < propertyIds.length; i++) {
            ownerProperties[i] = properties[propertyIds[i]];
        }

        return ownerProperties;
    }

    mapping(address => bool) public managers;

    modifier onlyAdminOrManager() {
        require(msg.sender == owner() || managers[msg.sender], "Only admin or manager can call this function");
        _;
    }

    // Function to grant manager role
    function addManager(address _manager) external onlyOwner {
        managers[_manager] = true;
    }

    // Function to revoke manager role
    function removeManager(address _manager) external onlyOwner {
        managers[_manager] = false;
    }

    function submitAndCreateProperty(uint256 propertyId, string memory addressDescription, string memory name, string memory symbol, uint256 landSize, uint256 initialTokenSupply, string memory ipfsHash) external onlyAdminOrManager{
    // Check if property with the given ID already exists
    require(properties[propertyId].owner == address(0), "Property already exists");



    
    propertyTokenContract = new PropertyToken(name, symbol);
    propertyTokenContract.mint(msg.sender, initialTokenSupply);

    // Submit the new property
    properties[propertyId] = Property({
        propertyId: propertyId,
        owner: msg.sender,
        addressDescription: addressDescription,
        isVerified: false,
        initialTokenSupply: initialTokenSupply,
        landSize: landSize,
        ipfsHash: ipfsHash
    });

    totalProperties++;
    ownerToProperties[msg.sender].push(propertyId);
    propertyTokens[propertyId] = address(propertyTokenContract);
}

    // Function to mark a property as verified after real-world verification
    function markAsVerified(uint256 propertyId) external onlyOwner {
        properties[propertyId].isVerified = true;
    }

    // Function to transfer ownership of a property
    function transferOwnership(uint256 propertyId, address newOwner) external onlyPropertyOwner(propertyId) {
        require(newOwner != address(0), "Invalid new owner address");
        require(newOwner != msg.sender, "You are already the owner");

        // Transfer ownership
        properties[propertyId].owner = newOwner;

        // Transfer property tokens
        propertyTokenContract.transferFrom(msg.sender, newOwner, properties[propertyId].initialTokenSupply);

        // Emit an event
        emit OwnershipTransferred(propertyId, msg.sender, newOwner);
    }

    function getAllProperties() external view returns (Property[] memory) {
        Property[] memory allProperties = new Property[](totalProperties);

        for (uint256 i = 1; i <= totalProperties; i++) {
            allProperties[i - 1] = properties[i];
        }

        return allProperties;
    }

    function getPropertyTokenAddress(uint256 propertyId) external view returns (address) {
    // Assuming propertyTokens is a mapping of propertyId to PropertyToken contract address
    address tokenAddress = propertyTokens[propertyId];

    // Check if the token address is not zero
    require(tokenAddress != address(0), "Token does not exist");

    // Create an instance of the PropertyToken contract
    PropertyToken propertyToken = PropertyToken(tokenAddress);

    // Return the token contract address
    return address(propertyToken);
}

    function getPropertyTokenInfo(uint256 propertyId) external view returns (string memory name, string memory symbol, string memory ipfsHash) {
    // Assuming propertyTokens is a mapping of propertyId to PropertyToken contract address
    address tokenAddress = propertyTokens[propertyId];

    // Check if the token address is not zero
    require(tokenAddress != address(0), "Token does not exist");

    // Create an instance of the PropertyToken contract
    PropertyToken propertyToken = PropertyToken(tokenAddress);

    // Call the functions to get name and symbol
    name = propertyToken.getTokenName();
    symbol = propertyToken.getTokenSymbol();
    ipfsHash = properties[propertyId].ipfsHash;
}
}
