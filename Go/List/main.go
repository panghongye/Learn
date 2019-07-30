package main

import "fmt"

type List interface {
	add(ele interface{})
	ins(ele interface{})
}

type ele struct {
	value    interface{}
	previous *ele
}

type list struct {
	data []ele
}

func (l *list) string() {
	for _, k := range l.data {
		fmt.Print(k.value, "\n")
	}
}

func (l *list) add(value interface{}) {
	len := len(l.data)
	if len > 0 {
		l.data = append(l.data, ele{value: value, previous: &l.data[len-1]})
	} else {
		l.data = append(l.data, ele{value: value, previous: nil})
	}
}

func (l *list) ins(value interface{}) {

}

func main() {
	var l list
	l.add(1)
	l.add("xx")
	l.string()
}
