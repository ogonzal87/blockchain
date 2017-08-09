


















const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, timeStamp, data, previousHash = '') {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timeStamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "ELCapoCoin", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let oscarCoin = new Blockchain();
oscarCoin.addBlock(new Block(1, "1/10/2017", {amount: 4}));
oscarCoin.addBlock(new Block(2, "1/12/2017", {amount: 10}));


console.log(JSON.stringify(oscarCoin, null, 4))