use rusty_chat::server::Server;
#[tokio::main]
pub async fn main() {
    env_logger::init();
    let port = 8080;
    let server = Server::new(port);
    format!("port is {}", port);
    server.run().await;
}
