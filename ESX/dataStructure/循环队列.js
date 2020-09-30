/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
	this.data = []
	this.max = k
}

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
	if (this.data.length >= this.max) return false
	this.data.push(value)
	return true
}

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
	if (!this.data.length) return false
	this.data.shift()
	return true
}

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
	let t = this.data[0]
	if (t == 0) return 0
	return t || -1
}

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
	let t = this.data[this.data.length - 1]
	if (t == 0) return 0
	return t || -1
}

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
	return this.data.length === 0
}

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
	return this.data.length === this.max
}

let circularQueue = new MyCircularQueue(3) // 设置长度为 3
console.log(circularQueue.enQueue(1)) // 返回 true
console.log(circularQueue.enQueue(2)) // 返回 true
console.log(circularQueue.enQueue(3)) // 返回 true
console.log(circularQueue.enQueue(4)) // 返回 false，队列已满
console.log(circularQueue.Rear()) // 返回 3
console.log(circularQueue.isFull()) // 返回 true
console.log(circularQueue.deQueue()) // 返回 true
console.log(circularQueue.enQueue(4)) // 返回 true
console.log(circularQueue.Rear()) // 返回 4
