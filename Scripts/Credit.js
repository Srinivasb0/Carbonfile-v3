
// 0x54cf9F316Bd8402d58A7d9a525Dc01A51c830244
const tokAddress = "0x91D17B6Dc4BeCA5eb24eB8864EE59C89EC4bc543";
const tokABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    // register credit holder
    "function registerCreditHolder(string holderid, string creditcid, string projectcid, uint totalcredits)",
    // mint tokens
    "function mint(uint totalcredits)",
    // transfer credits
    "function transferCredits(address _to, address _collection, uint256 _tokenId)",
    // burn tokens
    "function burn(address account, uint256 amount)",
]

const provider = new ethers.providers.Web3Provider(window.ethereum)
provider.send("eth_requestAccounts", []);
const signer = provider.getSigner()

// reading contract data
const pContract = new ethers.Contract(tokAddress, tokABI, provider);
// writing to contract data
const sContract = new ethers.Contract(tokAddress, tokABI, signer);
// register credit holders
const register = sContract.registerCreditHolder("1", "ipfs://QmNhbAcScMRMapVxX6uM8uxrYJq9G3AHhk2XkkCnjaNxUB/gscredit/token.json", 
                                "ipfs://QmNhbAcScMRMapVxX6uM8uxrYJq9G3AHhk2XkkCnjaNxUB/gscredit/register.json",
                                1);
                                
console.log(register);
// // mint total credits
// const mint = sContract.mint(1)
// // transfer credits
