import Web3 from 'web3';

class Metamask {
  constructor() {
    this.web3 = null;
    this.web3Provider = null;
    this.account = '0x0';
  }

  async init() {
    console.log('Metamask.init()');
    this.web3Provider = window.ethereum;
    this.web3 = new Web3(this.web3Provider);

    if (window.ethereum) {
      // eslint-disable-next-line no-undef
      await ethereum.enable();
      this.account = this.web3.currentProvider.selectedAddress;
      console.log('Your Account: ' + this.account);
    }
  }
}

export default Metamask;
