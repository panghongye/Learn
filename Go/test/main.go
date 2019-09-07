package main

import (
	"fmt"
)

func main() {
	var a float64 = .1
	var b float64 = .2
	c, c1 := a+b, .1+.2
	fmt.Println(c, c == c1, c1)
}
