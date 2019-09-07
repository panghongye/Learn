package main

import "fmt"

type ListNode struct {
	Value    interface{}
	Previous *ListNode
	Next     *ListNode
}

type List struct {
	Head *ListNode
	Last *ListNode
}

func (this *List) Add(value interface{}) {
	node := &ListNode{value, nil, nil}
	if this.Head == nil {
		this.Head = node
		this.Last = node
	} else {
		node.Previous = this.Last
		this.Last.Next = node
		this.Last = node
	}
}

func (this *List) forEach(forEach func(index int, item *ListNode)) {
	for i, node := 0, this.Head; node != nil; i, node = i+1, node.Next {
		forEach(i, node)
	}
}

type L interface {
	Add(value interface{})
	forEach(forEach func(index int, item *ListNode))
}

func main() {
	var l L = new(List)
	l.Add(0)
	l.Add(1)
	l.Add(2)
	l.Add(3)
	l.Add(4)
	l.forEach(func(index int, item *ListNode) {
		fmt.Println(`value`, item.Value)
		if item.Previous != nil {
			fmt.Println("Previous", item.Previous.Value)
		}
		if item.Next != nil {
			fmt.Println("Next", item.Next.Value)
		}
		fmt.Println()
	})
}
