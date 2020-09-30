// Chat is a server that lets clients chat with each other.
// https://books.studygolang.com/gopl-zh/ch8/ch8-10.html
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

type client chan<- string // 传出的消息通道

var (
	entering = make(chan client)
	leaving  = make(chan client)
	messages = make(chan string) // 所有传入的客户端消息
)

func broadcaster() {
	clients := make(map[client]bool) // 所有连接的客户
	for {
		select {
		case msg := <-messages:
			// 向所有人广播传入消息 客户的对外信息渠道。
			for cli := range clients {
				cli <- msg
			}
			fmt.Println(msg)

		case cli := <-entering:
			clients[cli] = true

		case cli := <-leaving:
			delete(clients, cli)
			close(cli)
		}
	}
}

func handleConn(conn net.Conn) {
	ch := make(chan string) // outgoing client messages
	go clientWriter(conn, ch)

	who := conn.RemoteAddr().String()
	ch <- "You are " + who
	messages <- who + " has arrived"
	entering <- ch

	input := bufio.NewScanner(conn)
	for input.Scan() {
		messages <- who + ": " + input.Text()
	}
	// NOTE: ignoring potential errors from input.Err()

	leaving <- ch
	messages <- who + " has left"
	conn.Close()
}

func clientWriter(conn net.Conn, ch <-chan string) {
	for msg := range ch {
		fmt.Fprintln(conn, msg) // NOTE: ignoring network errors
	}
}

func main() {
	listener, err := net.Listen("tcp", "localhost:8000")
	if err != nil {
		log.Fatal(err)
	}

	go broadcaster()
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print(err)
			continue
		}
		go handleConn(conn)
	}
}
