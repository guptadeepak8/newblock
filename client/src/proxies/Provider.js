import Web3 from 'web3';

class Provider {
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'),
    );
  }
}

export default Provider;