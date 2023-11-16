import { ethers } from 'ethers';
import abi from './abi.json';
import jsonData from './data.json';

async function commonFunction() {
  try {
    const selectedNetwork = localStorage.getItem('selectedNetworkId');
    if (!selectedNetwork) {
      console.error('No selected network ID found in localStorage');
      return null;
    }
    if (!jsonData[selectedNetwork]) {
      console.error(`No data found for network ID: ${selectedNetwork}`);
      return null;
    }
    return jsonData[selectedNetwork];
  } catch (error) {
    console.error('Error in commonFunction:', error);
    return null;
  }
}

//helpers
export async function getAddress() {
  const desiredChainID = await commonFunction();
  return desiredChainID?.address;
}

export async function getRPC() {
  const desiredChainID = await commonFunction();
  return desiredChainID?.rpcUrl;
}

//read
export async function isApproved() {
  try {
    let contractAddress = await getAddress();
    const rpc = await getRPC();
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    let value = await contract.getProposalInfo(1, 0);
    return value?.status;
  } catch (e) {
    console.log(e);
    return 2;
  }
}

//action
export async function sendProposal(signer) {
  let contractAddress = await getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  let tx = await contract.sendProposal(1, 1, '100', {
    value: '100',
  });
}
