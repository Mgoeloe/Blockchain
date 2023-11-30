const { SHA256 } = require("crypto-js");

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, Date(), "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let marlonCoin = new Blockchain();

console.log('Mining block 1...')
marlonCoin.addBlock(new Block(1, Date(), {amount: ~~(Math.random()*100)}));

console.log('Mining block 2...')
marlonCoin.addBlock(new Block(2, Date(), {amount: ~~(Math.random()*100)}));

console.log('Mining block 3...')
marlonCoin.addBlock(new Block(3, Date(), {amount: ~~(Math.random()*100)}));

console.log('Mining block 4...')
marlonCoin.addBlock(new Block(4, Date(), {amount: ~~(Math.random()*100)}));

console.log('Mining block 5...')
marlonCoin.addBlock(new Block(5, Date(), {amount: ~~(Math.random()*100)}));

console.log(JSON.stringify(marlonCoin, null, 4));

// marlonCoin.chain[1].data = {amount: 99}
// marlonCoin.chain[1].hash = marlonCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + marlonCoin.isChainValid());



