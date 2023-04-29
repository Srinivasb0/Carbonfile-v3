
import { ethers }  from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import dotenv from "dotenv";

dotenv.config();

const network = process.env.ETHEREUM_NETWORK;
const provider = new JsonRpcProvider(network);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

const cctABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns(uint)",

    "function registerCreditHolder(string holderid, string creditcid, string projectcid, uint totalcredits)",
    "function mint(uint totalcredits)",
    "function transferCredits(address _to, address _collection, uint256 _tokenId)",
    "function burnFrom(address account, uint256 amount)"
  ]

const cctAddress = '0x91D17B6Dc4BeCA5eb24eB8864EE59C89EC4bc543';
const providercontract = new ethers.Contract(cctAddress, cctABI, provider);
const signercontract = new ethers.Contract(cctAddress, cctABI, signer);

// call methods

async function registerCredit() {
  const credtholder = await signercontract.registerCreditHolder("124", "ipfs://QmNhbAcScMRMapVxX6uM8uxrYJq9G3AHhk2XkkCnjaNxUB/gscredit/token.json", 
  "ipfs://QmNhbAcScMRMapVxX6uM8uxrYJq9G3AHhk2XkkCnjaNxUB/gscredit/register.json", 1);
  console.log('Success-1');
}

async function mintTokens() {
  const tokens = await signercontract.mint(1);
  console.log('Success-2');
}

async function transferCreditCertificate() {
  const tcredits = await signercontract.transferCredits("0x5727a4C88Ad00a17bAD5d6DB71527393adb2f317", 
  "0x89e79AdBAcFD319Ae587Dd14cD268d798243614e", 1002);
  console.log('Success-3');
}

async function burnTokens() {
  const btokens = await signercontract.burnFrom("0xA03ab8a9d99F3779085BCc528b35EaCD949aeC1e", "1000000000000000000");
  console.log('Success-4');
}

// registerCredit()
// mintTokens()
// transferCreditCertificate()
// burnTokens()

