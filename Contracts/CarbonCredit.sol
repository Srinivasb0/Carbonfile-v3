// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/utils/ERC721Holder.sol";


contract CarbonCreditToken is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes, ERC721Holder {

    IERC721 public collection;

    constructor() ERC20("CarbonToken", "CTK") ERC20Permit("CarbonToken") {}

    uint totalRegistered = 0;
    struct CarbonCreditHolder {
        string holderid;
        string creditcid;
        string projectcid;
        uint totalcredits;
        address _addr;
    }

    mapping (uint => CarbonCreditHolder) public CreditHolders;
    mapping(address => uint) public BalanceOf;

    event newCreditHolder(string holderid, string creditcid, string projectcid, uint totalcredits, address _addr);
    function registerCreditHolder(string memory holderid, string memory creditcid, string memory projectcid, uint totalcredits) public {
        totalRegistered++;
        CreditHolders[totalRegistered] = CarbonCreditHolder(
            holderid,
            creditcid,
            projectcid,
            totalcredits,
            msg.sender);
        emit newCreditHolder(holderid, creditcid, projectcid, totalcredits, msg.sender);
    }

    modifier onlyCreditHolder() {
        require(msg.sender == CreditHolders[totalRegistered]._addr);
        _;
    }

    function mint(uint totalcredits) public onlyCreditHolder {
        address Owner = CreditHolders[totalRegistered]._addr;
        require(msg.sender == Owner);
        uint amount = totalcredits * 1000000000000000000;
        _mint(msg.sender, amount);
    }

    function transferCredits(address _to, address _collection, uint256 _tokenId) public  onlyCreditHolder(){
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, _to, _tokenId);

    }


    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }

}