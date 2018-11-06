pragma solidity ^0.4.24;

/*
 * CRITERIA: Define and implement interface. Smart contract implements the ERC-721 or ERC721Token interface
 */

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// @title A Star Notary Services to claim star in the galaxy
/// @author Virender Dagar
/// @notice This is a Notary service to claim a star in the Galaxy.
/// @dev Non-fungible token based on ERC721 and Ownable to make sure only the owner is calling the required function
contract StarNotary is ERC721, Ownable {

	/*
	 * CRITERIA: Add metadata to the star token. The star token should have these pieces of metadata added:
	 *	* Star coordinators
	 *		- Ra
	 *		- Dec
	 *		- Mag
	 *
	 *	* Star story
	 */

	struct Coordinates {
		string ra;
		string dec;
		string mag;
	}

	struct Star {
		string name;
		string story;
		Coordinates coord;
	}

	uint256 public tokenCount;

	mapping(uint256 => Star) public tokenIdToStarInfo;
	mapping(uint256 => uint256) public starsForSale;

	/*
	 * CRITERIA: Configure uniqueness with the stars. Smart contract prevents stars with the same coordinates from being added
	 */
	mapping(bytes32 => bool) public starHashMap;
	uint256[] public saleIndexes;

	/*
	 * CRITERIA: Smart contract contains required functions. mart contract implements all these functions -
	 *		createStar(), putStarUpForSale(), buyStar(), checkIfStarExist(), mint(), approve(),
	 * 		safeTransferFrom(), SetApprovalForAll(), getApproved(), isApprovedForAll(), ownerOf(),
	 *		starsForSale(), tokenIdToStarInfo()
	 */
	/// @notice Create a new Star in the Galaxy
	/// @dev public function, May be this should be external
	/// @param _name The name the Star
	/// @param _ra The ra of the star coordinate
	/// @param _dec The dec of the star coordinate
	/// @param _mag The meg of the star coordinate
	/// @param _story Story behind how you found the star
	/// @return nothing
	function createStar(string _name, string _story, string _ra, string _dec, string _mag) public {
		tokenCount++;
		uint256 tokenId = tokenCount;

		//check if tokenId already exists
		require(keccak256(abi.encodePacked(tokenIdToStarInfo[tokenId].coord.dec)) == keccak256(""), "TokenId already exits");

		require(keccak256(abi.encodePacked(_ra)) != keccak256(""), "ra cannot be empty");
		require(keccak256(abi.encodePacked(_dec)) != keccak256(""), "dec cannot be empty");
		require(keccak256(abi.encodePacked(_mag)) != keccak256(""), "mag cannot be empty");
		require(tokenId != 0, "Token Id cannot be zero");

		/*
		 * CRITERIA: Configure uniqueness with the stars. Smart contract prevents stars with the same coordinates from being added
		 */
		require(!checkIfStarExist(_ra, _dec, _mag), "Star Already Exist");

		Coordinates memory newCoordinates = Coordinates(_ra, _dec, _mag);
		Star memory newStar = Star(_name, _story, newCoordinates);

		tokenIdToStarInfo[tokenId] = newStar;

		bytes32 hash = generateStarHash(_ra, _dec, _mag);
		starHashMap[hash] = true;

		_mint(msg.sender, tokenId);
	}

	/// @notice Put a star up for sale
	/// @dev This function should be called only by the owner of the star
	/// @param _tokenId Id of the star
	/// @param _price Price of the star
	/// @return nothing
	function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
		require(this.ownerOf(_tokenId) == msg.sender, "Caller is not the owner of the start");
		require(checkIfStarExist(tokenIdToStarInfo[_tokenId].coord.ra, tokenIdToStarInfo[_tokenId].coord.dec,
					tokenIdToStarInfo[_tokenId].coord.mag),
				"Star does not Exist cannot be put up for sale");

		starsForSale[_tokenId] = _price;
		saleIndexes.push(_tokenId);
	}

	/// @notice Buy a start up for sale
	/// @dev Anyone can buy a star that is up for sale
	/// @param _tokenId Id of the star to be bought
	/// @return nothing
	function buyStar(uint256 _tokenId) public payable {
		uint indexToBeDeleted;
		require(starsForSale[_tokenId] > 0, "Sender not authorized.");

		uint256 starCost = starsForSale[_tokenId];
		address starOwner = this.ownerOf(_tokenId);
		require(msg.value >= starCost, "Ether Sent is not enough");

		_removeTokenFrom(starOwner, _tokenId);
		_addTokenTo(msg.sender, _tokenId);

		starOwner.transfer(starCost);

		if(msg.value > starCost) {
			msg.sender.transfer(msg.value - starCost);
		}

		/* Remove sold star from the list of stars for sale */
		for (uint i = 0; i < saleIndexes.length; i++) {
			if (saleIndexes[i] == _tokenId) {
				indexToBeDeleted = i;
				break;
			}
		}

		if (indexToBeDeleted < saleIndexes.length-1) {
			saleIndexes[indexToBeDeleted] = saleIndexes[saleIndexes.length-1];
		}

		saleIndexes.length--;
	}

	/// @notice function to check if the star already exist in the galaxy
	/// @dev This is a public function which can be called from outside as well
	/// @param _ra One of the star coordinate value to check for existence
	/// @param _dec One of the star coordinate value to check for existence
	/// @param _mag One of the star coordinate value to check for existence
	/// @return true if the star already exist, otherwise false
	function checkIfStarExist(string _ra, string _dec, string _mag) public view returns (bool) {

		return starHashMap[generateStarHash(_ra, _dec, _mag)];
	}

	/// @notice function to generate the hash for star. This is uesed to check if the star already exist
	/// @param _ra One of the star coordinate value to check for existence
	/// @param _dec One of the star coordinate value to check for existence
	/// @param _mag One of the star coordinate value to check for existence
	/// @return 256 bit hash value for the star
	function generateStarHash(string _ra, string _dec, string _mag) private pure returns(bytes32) {
		return keccak256(abi.encodePacked(_ra, _dec, _mag));
	}

	/// @notice function returns the properties of the existing star
	/// @dev This function can be called from outside as well
	/// @param _tokenId tokenId of the star for which the properites are requested
	/// @return name, story, ra, dec and mag properties of the star
	function tokenIdToStarInfo(uint256 _tokenId) public view returns(string, string, string, string, string) {
		return (tokenIdToStarInfo[_tokenId].name, tokenIdToStarInfo[_tokenId].story, tokenIdToStarInfo[_tokenId].coord.ra,
				tokenIdToStarInfo[_tokenId].coord.dec, tokenIdToStarInfo[_tokenId].coord.mag);
	}

	/// @notice function to mint a new token
	/// @dev This function can be called from outside as well
	/// @param _tokenId tokenId of the star to mint
	function mint(uint256 _tokenId) public {
		super._mint(msg.sender, _tokenId);
	}

	/// @notice function to return all the stars that have been put for sale
	/// @dev this function can be called from outside
	/// returns arrays of tokenId and price of the stars for sale
	function getStarsForSale() public view returns(uint256[], uint256[]){
		uint[] memory price = new uint[](saleIndexes.length);

		for (uint i = 0;i < saleIndexes.length; i++) {
			price[i] = starsForSale[saleIndexes[i]];
		}

		return (saleIndexes, price);
	}
}
