
import { ethers }  from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import dotenv from "dotenv";

dotenv.config();

const network = process.env.ETHEREUM_NETWORK;
const provider = new JsonRpcProvider(network);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);


const cccABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns(uint)",

    "function safeMint(address to, uint256 tokenId, string memory uri)",
    "function setApprovalForAll(address operator, bool approved)",
  ]

  const cccAddress = '0x89e79AdBAcFD319Ae587Dd14cD268d798243614e'
  const providercontract = new ethers.Contract(cccAddress, cccABI, provider);
  const signercontract = new ethers.Contract(cccAddress, cccABI, signer);
  // call methods

async function mintCertificate() {
  const certificate = await signercontract.safeMint("0xA03ab8a9d99F3779085BCc528b35EaCD949aeC1e",
                      '1002', 'ipfs://QmNhbAcScMRMapVxX6uM8uxrYJq9G3AHhk2XkkCnjaNxUB/gscredit/certification.json')
}

async function approveNftTransfer() {
  const approveNFT = await signercontract.setApprovalForAll('0x91D17B6Dc4BeCA5eb24eB8864EE59C89EC4bc543', true);
  console.log('success');
}

async function main() {
    
    const name = await providercontract.name();
    const symbol = await providercontract.symbol();
    console.log(name, symbol);
}

// mintCertificate();

// approveNftTransfer()

main();