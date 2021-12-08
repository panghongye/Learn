use Node::*;

enum Node {
    // Value：元组结构体，包含链表的一个元素和一个指向上一节点的指针
    Value(u32, Box<Node>),
    // Null：末结点，表明链表结束
    Null,
}

// 可以为 enum 定义方法
impl Node {
    // 创建一个空的 Node 实例
    fn new() -> Node {
        // `Null` 为 `Node` 类型（译注：因 `Null` 的完整名称是 `Node::Null`）
        Null
    }

    // 处理一个 Node，在其头部插入新元素，并返回该 Node
    fn prepend(self, elem: u32) -> Node {
        // `Value` 同样为 Node 类型
        Value(elem, Box::new(self))
    }

    fn get_value(self) -> u32 {
        match self {
            Value(a, _) => a,
            Null => 0,
        }
    }

    // 返回 Node 的长度
    fn len(&self) -> u32 {
        // 必须对 `self` 进行匹配（match），因为这个方法的行为取决于 `self` 的
        // 取值种类。
        // `self` 为 `&Node` 类型，`*self` 为 `Node` 类型，匹配一个具体的 `T`
        // 类型要好过匹配引用 `&T`。
        match *self {
            // 不能得到 tail 的所有权，因为 `self` 是借用的；
            // 因此使用一个对 tail 的引用
            Value(_, ref tail) => 1 + tail.len(),
            // （递归的）基准情形（base case）：一个长度为 0 的空列表
            Null => 0,
        }
    }

    // 返回列表的字符串表示（该字符串是堆分配的）
    fn stringify(&self) -> String {
        match *self {
            Value(head, ref tail) => {
                // `format!` 和 `print!` 类似，但返回的是一个堆分配的字符串，
                // 而不是打印结果到控制台上
                format!("{}, {}", head, tail.stringify())
            }
            Null => {
                format!("Null")
            }
        }
    }
}

fn main() {
    // 创建一个空链表
    let mut list = Node::new();

    // 追加一些元素
    list = list.prepend(1);
    list = list.prepend(2);
    list = list.prepend(3);

    // 显示链表的最后状态
    println!("linked list has length: {}", list.len());
    println!("{}", list.stringify());
    println!("???????????? {}", list.get_value());
}
