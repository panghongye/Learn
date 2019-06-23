const SHA256 = require('crypto-js/sha256')

interface Transaction {
	sender: string
	recipient: string
	amount: number
}

class Block {
	index: any
	timestamp: any
	transactions: Transaction[]
	previousHash: string
	hash: string
	constructor(index, timestamp) {
		this.index = index // 区块在区块链中的位置；
		this.timestamp = timestamp // 区块产生的时间；
		this.transactions = [] // 区块包含的交易；
		this.previousHash = '' //  前一个区块的Hash值；
		this.hash = this.calculateHash() // 当前区块的Hash值；
	}

	calculateHash = (): string =>
		SHA256(
			this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions)
		).toString()

	addNewTransaction = (sender: string, recipient: string, amount: number) => {
		this.transactions.push({
			sender,
			recipient,
			amount
		} as Transaction)
	}

	getTransactions = (): Transaction[] => this.transactions
}

class Blockchain {
	chain: Block[]
	constructor() {
		this.chain = [this.createGenesisBlock()]
	}

	createGenesisBlock = (): Block => {
		const genesisBlock = new Block(0, '01/10/2017')
		genesisBlock.previousHash = '0'
		genesisBlock.addNewTransaction('Leo', 'Janice', 520)
		return genesisBlock
	}

	getLatestBlock = (): Block => this.chain[this.chain.length - 1]

	addBlock = (newBlock: Block) => {
		newBlock.previousHash = this.getLatestBlock().hash
		newBlock.hash = newBlock.calculateHash()
		this.chain.push(newBlock)
	}

	isChainValid = () => {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i]
			const previousBlock = this.chain[i - 1]

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false
			}
		}
		return true
	}
}

const testCoin = new Blockchain()
console.log(JSON.stringify(testCoin.chain, undefined, 2))
