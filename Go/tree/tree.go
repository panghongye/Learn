package main

import "container/list"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// type Tree struct {
// 	Root *TreeNode
// }

func Dfs(node *TreeNode, cb func(val int)) {
	if node == nil {
		return
	}
	cb(node.Val)
	Dfs(node.Left, cb)
	Dfs(node.Right, cb)
}

func preorderTraversal(root *TreeNode) []int {
	r := []int{}
	Dfs(root, func(val int) {
		r = append(r, val)
	})
	return r
}

func Bfs(node *TreeNode, cb func(row []int)) {
	if node == nil {
		return
	}
	l, r, row := node.Left, node.Right, []int{}
	if l != nil {
		row = append(row, l.Val)
	}
	if r != nil {
		row = append(row, r.Val)
	}
	if len(row) > 0 {
		cb(row)
	}
	Bfs(l, cb)
	Bfs(r, cb)
}

func levelOrder_(root *TreeNode) [][]int {
	r := [][]int{}
	if root == nil {
		return r
	}
	r = append(r, []int{root.Val})
	Bfs(root, func(row []int) {
		r = append(r, row)
	})
	return r
}

func levelOrder(root *TreeNode) [][]int {
	var result [][]int
	if root == nil {
		return result
	}
	// 使用双向队列
	list := list.New()
	// 头部插入
	list.PushFront(root)
	//visited := set.New(set.NonThreadSafe)
	// 进行广度搜索
	for list.Len() > 0 {
		var currentLevel []int
		listLength := list.Len()
		for i := 0; i < listLength; i++ {
			// 尾部移除
			node := list.Remove(list.Back()).(*TreeNode)
			currentLevel = append(currentLevel, node.Val)
			if node.Left != nil {
				list.PushFront(node.Left)
			}
			if node.Right != nil {
				list.PushFront(node.Right)
			}
		}
		result = append(result, currentLevel)

	}
	return result
}
