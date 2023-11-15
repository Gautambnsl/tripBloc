import { ethers } from "ethers";
import {abi} from "./abi.json"
import {jsonData} from "./data.json"

//helpers
export async function getAddress() {
	
}

export async function getRPC(e) {
	
}

//read
export async function isApproved(){
	let contractAddress = await getAddress()
    const rpc = await getRPC();
	const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    let value =  contract.getProposalInfo(1,0);
    console.log(value);
    
}

//action
export async function sendProposal(hotelId,date,payment) {
    let contractAddress = await getAddress()
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let tx = contract.sendProposal(hotelId,date,payment,{
        value: "100",
      })
}
