import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

async function login() {
  const options = { method: 'POST' };
  const url = '/api/auth/challenge';
  const { nonce } = await fetch(url, options).then((res) => res.json());
  const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
  const address = ethers.utils.getAddress(account);
  const rawMessage = new SiweMessage({
    domain: window.location.host,
    address: address,
    statement: 'Sign in with Ethereum to the app.',
    uri: window.location.origin,
    version: '1',
    chainId: '1',
    nonce,
  });

  const message = rawMessage.prepareMessage();
  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [message, address],
  });
  console.log('signature', signature);
  console.log('message', rawMessage);

  const result = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  }).then((res) => res.json());

  console.log(result);
}

document.getElementById('siwe-login').addEventListener('click', login);
