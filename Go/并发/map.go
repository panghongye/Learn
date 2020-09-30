package main

import (
	"fmt"
	"sync"
	"time"
)

func mapDemo1(N int) {
	var wg sync.WaitGroup
	wg.Add(2)
	defer wg.Wait()

	var lo sync.RWMutex
	m := make(map[int]int)

	go func() {
		defer wg.Done()
		for i := 0; i < N; i++ {
			lo.Lock()
			m[i] = i // write
			lo.Unlock()
		}
	}()

	time.Sleep(time.Nanosecond)

	go func() {
		defer wg.Done()
		for i := 0; i < N; i++ {
			lo.RLock()
			fmt.Println(i, m[i]) // read
			lo.RUnlock()
		}
	}()
}

func main() {
	mapDemo1(9999)
}
