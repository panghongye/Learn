package main

import (
	"math"
)

type MinStack struct {
	val []int
	min int
}

/** initialize your data structure here. */
func Constructor() MinStack {
	return MinStack{[]int{}, math.MaxInt64}
}

func (this *MinStack) Push(x int) {
	this.val = append(this.val, x)
	if x < this.min {
		this.min = x
	}
}

func (this *MinStack) Pop() {
	this.val = this.val[0:len(this.val)]
}

func (this *MinStack) Top() int {
	return this.val[len(this.val)]
}

func (this *MinStack) GetMin() int {
	return this.min
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */

func main() {}
