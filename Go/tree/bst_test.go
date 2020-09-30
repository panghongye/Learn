package tree

import (
	"fmt"
	"testing"
)

func TestA(test *testing.T) {
	t := BST{}
	t.Insert(9, 3, 6, 4, 7, 1, 5, 2, 8, 0)
	t.Remove(0)
	t.Depth()
	t.Postorder(func(val int) {})
	t.Preorder(func(val int) {})
	fmt.Println(t.Max(), t.Min(), t.Search(5))
	t.Inorder(func(val int) {
		fmt.Println(val, " ")
	})
}
