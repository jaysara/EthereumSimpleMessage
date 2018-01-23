const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 = require('web3');

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);
//const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async ()=>{
  //get a list of all unlocked accounts
// console.log(" *****  Interface is "+ interface);
   accounts = await web3.eth.getAccounts();

   //console.log("Bytecode is "+ bytecode);

  // Use one of those accounts to deploy the contract
  inbox =  await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments:['Hi there!']})
      .send({from: accounts[0], gas:'1000000'})

      // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
        inbox.setProvider(provider);
});

describe('InboxTest',()=>{
  it('deploys a contract',() =>{
    console.log("Verifying inbox contract does get a function assigned...");
    //console.log(inbox);
    assert.ok(inbox.options.address);
  });

  it('has default message ', async()=>{
    const message = await inbox.methods.message().call();
    assert.ok(message,'Hi there!');
  });

  it('can change the message ', async()=>{
   await inbox.methods.setMessage('bye').send({from: accounts[0]});
   const message = await inbox.methods.message().call();
   assert.ok(message,'bye');
  //  assert.ok(message,'Hi there!');
  });
});
