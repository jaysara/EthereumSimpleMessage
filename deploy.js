const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode}  = require('./compile')

const provider = new HDWalletProvider(
  'wire august fan arch sustain magnet surge kid speak cream visit flat',
  'https://rinkeby.infura.io/vyVt4ISM7XCZpXOZj7C2'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from accounts ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hello Jay!']})
    .send({gas: '1000000', from : accounts[0]});

  console.log('Contract deployed to ', result.options.address);  
};
deploy();
