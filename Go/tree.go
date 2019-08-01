package m

// import "fmt"

type Node struct {
	value interface{}
	left  *Node
	right *Node
}

type Tree interface {
	Ins(value interface{})
	
}


