package tree

type BSTInterface interface {
	Insert(int)
	Min() int //最左边
	Max() int //最右边
	Remove(int)
	Preorder(func(val int))  // 先序遍历 根左右
	Inorder(func(val int))   // 中序遍历 左根右 升序
	Postorder(func(val int)) // 后序遍历 左右根
	Depth() int
	Search(int) bool
}

type node struct {
	val   int
	left  *node // left.val < val
	right *node // left.val >= val
}

type BST struct {
	root *node
}

func (this *BST) Insert(val ...int) {
	for _, v := range val {
		new := &node{val: v}
		root := this.root
		if root == nil {
			this.root = new
		} else {
			insNode(new, root)
		}
	}
}
func (this *BST) Preorder(cb func(val int))  { preorder(this.root, cb) }
func (this *BST) Inorder(cb func(val int))   { inorder(this.root, cb) }
func (this *BST) Postorder(cb func(val int)) { postorder(this.root, cb) }
func (this *BST) Min() int                   { return mostL(this.root).val }
func (this *BST) Max() int                   { return mostR(this.root).val }
func (this *BST) Search(val int) bool        { return search(val, this.root) != nil }
func (this *BST) Depth() int                 { return _calculate_depth(this.root, 0) }
func (this *BST) Remove(val ...int) {
	for _, v := range val {
		this.root = removeNode(this.root, v)
	}
}

func removeNode(node *node, val int) *node {
	if node == nil { //{2}
		return nil
	}
	if val < node.val { //{3}
		node.left = removeNode(node.left, val)
		//{4}
		return node
		//{5}}
	}
	if val > node.val { //{6}
		node.right = removeNode(node.right, val) //{7}
		return node                              //{8}
	}
	//val等于node.val
	//第一种情况——一个叶节点
	if node.left == nil && node.right == nil { //{9}
		node = nil  //{10}
		return node //{11}
	}
	//第二种情况——一个只有一个子节点的节点
	if node.left == nil { //{12}
		node = node.right //{13}
		return node       //{14}
	} else if node.right == nil { //{15}
		node = node.left //{16}
		return node      //{17}
	}
	//第三种情况——一个有两个子节点的节点
	var aux = mostL(node.right)                  //{18}
	node.val = aux.val                           //{19}
	node.right = removeNode(node.right, aux.val) //{20}
	return node                                  //{21}
}

func search(val int, current *node) *node {
	if nil == current {
		return nil
	}
	if val == current.val {
		return current
	}
	if val < current.val {
		return search(val, current.left)
	}
	if val > current.val {
		return search(val, current.right)
	}
	return nil
}

func insNode(new *node, current *node) {
	if new.val < current.val {
		if current.left == nil {
			current.left = new
		} else {
			insNode(new, current.left)
		}
	} else {
		if current.right == nil {
			current.right = new
		} else {
			insNode(new, current.right)
		}
	}
}

func preorder(n *node, cb func(val int)) {
	if n == nil {
		return
	}
	cb(n.val)
	preorder(n.left, cb)
	preorder(n.right, cb)
}
func inorder(n *node, cb func(val int)) {
	if n == nil {
		return
	}
	inorder(n.left, cb)
	cb(n.val)
	inorder(n.right, cb)
}
func postorder(n *node, cb func(val int)) {
	if n == nil {
		return
	}
	postorder(n.left, cb)
	postorder(n.right, cb)
	cb(n.val)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// helper function for this.depth
func _calculate_depth(n *node, depth int) int {
	if n == nil {
		return depth
	}
	return max(_calculate_depth(n.left, depth+1), _calculate_depth(n.right, depth+1))
}

func mostL(n *node) *node {
	if n.left == nil {
		return n
	}
	return mostL(n.left)
}
func mostR(n *node) *node {
	if n.right == nil {
		return n
	}
	return mostR(n.right)
}
