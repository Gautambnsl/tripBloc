import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

export async function push(status, from, to) {
  const PK = '3e4446e56aba7358beb2cdac973fe690af36d407bc52f9a73fc4fa80e838f57b'; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  if (status === 'sign') {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `TripBloc`,
        body: `New message from TripBloc`,
      },
      payload: {
        title: `Wow! You Have Been Added As Benificary By ${from} 😊`,
        body: `Go to TripBloc Benifiary's Section to See Details`,
        cta: '',
        img: '',
      },
      recipients: `eip155:5:${to}`, // recipient address
      channel: 'eip155:5:0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F', // your channel address
      env: 'staging',
    });
  }
  if (status === 'change') {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `TripBloc`,
        body: `New message from TripBloc`,
      },
      payload: {
        title: `One UPDATE! in your Benificary's Section`,
        body: `Go to TripBloc Benifiary's Section to See Details`,
        cta: '',
        img: '',
      },
      recipients: `eip155:5:${to}`, // recipient address
      channel: 'eip155:5:0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F', // your channel address
      env: 'staging',
    });
  }
}
