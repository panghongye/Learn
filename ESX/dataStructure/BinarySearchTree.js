class Node {
	constructor(key) {
		//{1}
		this.key = key
		this.left = null
		this.right = null
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null //{2}
	}

	insert(key) {
		var newNode = new Node(key) //{1}
		if (this.root === null) this.root = newNode //{2}
		else insertNode(this.root, newNode) //{3}
	}

	inOrderTraverse(callback) {
		inOrderTraverseNode(this.root, callback) //{1}
	}

	preOrderTraverse(callback) {
		preOrderTraverseNode(this.root, callback)
	}

	postOrderTraverse(callback) {
		postOrderTraverseNode(this.root, callback)
	}

	min() {
		return minNode(this.root) //{1}
	}

	max() {
		return maxNode(this.root)
	}

	search(key) {
		return searchNode(this.root, key) //{1}
	}

	remove(key) {
		this.root = removeNode(this.root, key) //{1}
	}
}

function insertNode(node, newNode) {
	if (newNode.key < node.key) {
		//{4}
		if (node.left === null)
			//{5}
			node.left = newNode //{6}
		else insertNode(node.left, newNode) //{7}
	} else {
		if (node.right === null)
			node.right = newNode //  {8} {9}
		else insertNode(node.right, newNode) //{10}
	}
}


var removeNode = function (node, key) {
	if (node === null) {//{2}
		return null;
	}
	if (key < node.key) {//{3}
		node.left = removeNode(node.left, key);
		//{4}
		return node;
		//{5}}
	}
	else if (key > node.key) {//{6}
		node.right = removeNode(node.right, key);//{7}
		return node;//{8}
	}
	else {//键等于node.key//第一种情况——一个叶节点
		if (node.left === null && node.right === null) {//{9}
			node = null;//{10}
			return node;//{11}
		}
		//第二种情况——一个只有一个子节点的节点
		if (node.left === null) {//{12}
			node = node.right;//{13}
			return node;//{14}
		} else if (node.right === null) {//{15}
			node = node.left;//{16}
			return node;//{17}
		}
		//第三种情况——一个有两个子节点的节点
		var aux = findMinNode(node.right);//{18}
		node.key = aux.key;//{19}
		node.right = removeNode(node.right, aux.key);//{20}
		return node;//{21}
	}
};




function inOrderTraverseNode(node, callback) {
	if (node !== null) {
		//{2}
		inOrderTraverseNode(node.left, callback) //{3}
		callback(node.key) //{4}
		inOrderTraverseNode(node.right, callback) //{5}
	}
}

function preOrderTraverseNode(node, callback) {
	if (node !== null) {
		callback(node.key) //{1}
		preOrderTraverseNode(node.left, callback) //{2}
		preOrderTraverseNode(node.right, callback) //{3}
	}
}

function postOrderTraverseNode(node, callback) {
	if (node !== null) {
		postOrderTraverseNode(node.left, callback) //{1}
		postOrderTraverseNode(node.right, callback) //{2}
		callback(node.key)
	}
}

function minNode(node) {
	if (node) {
		while (node && node.left !== null) {
			//{2}
			node = node.left //{3}
		}
		return node.key
	}
	return null //{4}
}

function maxNode(node) {
	if (node) {
		while (node && node.right !== null) {
			//{5}
			node = node.right
		}
		return node.key
	}
	return null
}

function searchNode(node, key) {
	if (node !== null) return false //{2}
	if (key < node.key) return searchNode(node.left, key)
	else if (key > node.key)
		//{3} //{4}
		return searchNode(node.right, key) //{5} //{6}
	else return true //{7}
}

// test
function printNode(value) {
	console.log(value)
}

tree = new BinarySearchTree()

tree.insert(11)

