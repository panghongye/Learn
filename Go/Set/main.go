package main

import (
	"fmt"
	"github.com/zoumo/goset"
)

func main() {
	a := []interface{}{"1", "2", "3", "1", "2", "3", 1, 2, 3, 1, 1, 1, 1}
	// b := goset.NewSetFrom(a)
	b := goset.NewSafeSetFrom(a)

	b.Range(func(index int, elem interface{}) bool {
		fmt.Print(elem, "\n")
		return true
	})

}
