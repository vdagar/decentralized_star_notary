pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// @title A Star Notary Services to claim star in the galaxy
/// @author Virender Dagar
/// @notice This is a Notary service to claim a star in the Galaxy.
/// @dev Non-fungible token based on ERC721 and Ownable to make sure only the owner is calling the required function
contract StarNotary is ERC721, Ownable {

	struct Coordinates {
		string dec;
		string meg;
		string cent;
	}

	struct Star {
		string name;
		Coordinates coord;
		string story;
	}

	mapping(uint256 => Star) public tokenIdToStarInfo;
	mapping(uint256 => uint256) public starsForSale;

	/// @notice Create a new Star in the Galaxy
	/// @dev public function, May be this should be external
	/// @param _name The name the Star
	/// @param _dec One of the star coordinate value
	/// @param _meg One of the star coordinate value
	/// @param _cent One of the star coordinate value
	/// @param _story Story behind how you found the star
	/// @return nothing
	function createStar(string _name, string _dec, string _meg, string _cent, string _story, uint256 _tokenId) public {
		Star memory newStar = Star(_name, Coordinates(_dec, _meg, _cent), _story);

		tokenIdToStarInfo[_tokenId] = newStar;

		_mint(msg.sender, _tokenId);
		tokenId.push(_tokenId);
	}

	/// @notice Put a star up for sale
	/// @dev This function should be called only by the owner of the star
	/// @param _tokenId Id of the star
	/// @param _price Price of the star 
	/// @return nothing
	function putStarUpForSale(uint256 _tokenId, uint256 _price) public onlyOwner() {

		starsForSale[_tokenId] = _price;
	}

	/// @notice Buy a start up for sale
	/// @dev Anyone can buy a star that is up for sale
	/// @param _tokenId Id of the star to be bought
	/// @return nothing
	function buyStar(uint256 _tokenId) public payable {
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
	}
}
