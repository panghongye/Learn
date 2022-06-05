// #![allow(unused_must_use)]
#[macro_use]
extern crate rbatis;
#[macro_use]
extern crate lazy_static;

use rbatis::crud::CRUD;
use rbatis::rbatis::Rbatis;
use salvo::prelude::*;

lazy_static! {
  pub static ref RB:Rbatis = Rbatis::new(); // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，无需担心线程竞争
}

#[crud_table]
#[derive(Clone, Debug)]
pub struct Todo {
    pub id: Option<String>,
    pub body: Option<String>,
}

#[fn_handler]
async fn hello_world() -> &'static str {
    RB.exec("CREATE TABLE biz_uuid( id uuid, name VARCHAR, PRIMARY KEY(id));",vec![]).await;
    "Hello world"
}

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::config::Config::new().console());
    // RB.link("sqlite://target/sqlite.db");
    RB.link("mysql://root:rootroot@localhost:3306/test")
        .await
        .unwrap();
    log::info!("linking database successful!");
    Server::new(TcpListener::bind("127.0.0.1:7878"))
        .serve(Router::new().get(hello_world))
        .await;
    log::info!("server quit!");
}
