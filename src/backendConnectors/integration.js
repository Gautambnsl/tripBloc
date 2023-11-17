import { ethers } from 'ethers';
import abi from './abi.json';
import jsonData from './data.json';
import api3Abi from "./datafeedabi.json"

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
    try{

        let contractAddress = await getAddress();
        console.log('contractAddress', contractAddress)
        const rpc = await getRPC();
        console.log('rpc', rpc)
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        console.log('provider', provider)
        const contract = new ethers.Contract(contractAddress, abi, provider);
        console.log('contract', contract)
        let value = await contract.getProposalInfo(1, 0);
        console.log("🍌🍌🍌",value[3]);
    }catch(e){
        console.log(e)
        return 3;
    }
}
export async function roomPrice() {
    try{
        let contractAddress = await getAddress();
        console.log('contractAddress', contractAddress)
        const rpc = await getRPC();
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        let value = await contract.hotels(1);
        console.log("ROOM PRICE",value[3]);
    }catch(e){
        console.log(e)
        return "17999999999999998"
    }
}

//action
export async function sendProposal(hotelId, date, payment, signer) {
  let contractAddress = await getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  let tx = await contract.sendProposal(hotelId, date, payment, {
    value: '100',
  });
}




//api3
export async function fetchDataFeed(){
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.public.zkevm-test.net");
  const contract = new ethers.Contract("0xc9C214a1BA1c266e632C3274B2c2d33422f3963b", api3Abi, provider);
  let data = await contract.readDataFeed();
  console.log(data[0])
}
