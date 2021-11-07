use rusty_chat::server::Server;

#[tokio::main]
async fn main() {
    env_logger::init();
    let port = 8080;
    let server = Server::new(port);
    println!("port is {}", port);
    server.run().await;
}
