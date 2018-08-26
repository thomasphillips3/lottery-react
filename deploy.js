const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('Web3');
const { interface, bytecode } = require('./compile');
const MNEMONIC = 'verify view whale gloom slow squeeze despair addict return rotate guard young';
const RINKEBY = 'https://rinkeby.infura.io/v3/bcec170506334d53ad8215f9d8c97143';

const provider = new HDWalletProvider(
    MNEMONIC,
    RINKEBY
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode })
        .send({ from: accounts[0], gas: '1000000' });
    console.log('Deployed to ', result.options.address);
};
