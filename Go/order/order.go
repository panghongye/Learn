package main

import "fmt"

// 两两比较大小 O(n^2)
func 冒泡(arr []int) {
	for i := 0; i < len(arr)-1; i++ {
		for j := 0; j < len(arr)-1-i; j++ {
			a := arr[j]
			b := arr[j+1]
			if a > b {
				arr[j] = b
				arr[j+1] = a
			}
		}
	}
}

func main() {
	arr := [21]int{30, 67, 8, 12, 77, 17, 55, 10, 25, 88, 20, 2, 40, 66, 33, 31, 50, 46, 66, 44, 88}
	冒泡(arr[:])
	fmt.Println(arr)
}
