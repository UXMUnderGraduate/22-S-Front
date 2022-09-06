import Web3 from 'web3';
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

class Metamask {
  constructor() {
    this.web3 = null;
    this.web3Provider = null;
    this.account = '0x0';
  }

  async init() {
    console.log('Metamask.init()');
    this.web3Provider = await detectEthereumProvider();
    if (!this.web3Provider) {
      console.log('Please install MetaMask!');
      alert('Please install MetaMask!');
      return;
    }
    await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error);
          alert('Please connect to MetaMask.');
        }
      });
    this.web3 = new Web3(this.web3Provider);
    this.account = this.web3.currentProvider.selectedAddress;
    console.log('Your Account: ' + this.account);
  }
}

export default Metamask;
