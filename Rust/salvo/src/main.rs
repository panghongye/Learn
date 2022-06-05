// #![allow(unused_must_use)]
#[macro_use]
extern crate rbatis;
#[macro_use]
extern crate lazy_static;

use rbatis::crud::CRUD;
use rbatis::rbatis::Rbatis;
use salvo::{hyper::header, prelude::*};
use serde::{Deserialize, Serialize};

lazy_static! {
  pub static ref RB:Rbatis = Rbatis::new(); // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，无需担心线程竞争
}


#[crud_table]
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TabTodo {
    pub id: i32,
    pub body: Option<String>,
}

#[fn_handler]
async fn hello_world() -> &'static str {
    // RB.exec("CREATE TABLE biz_uuid( id VARCHAR, name VARCHAR, PRIMARY KEY(id));",vec![]).await;
    RB.exec("SELECT NOW();", vec![]).await.unwrap();
    "Hello world"
}

#[fn_handler]
async fn lists(res: &mut Response) {
    let result: Vec<TabTodo> = RB.fetch_list().await.unwrap();
    // res.render(Text::Json(result));
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

// pub fn set_json_response<T: serde::Serialize>(res: &mut Response, size: usize, json: T) {
//     res.headers_mut().insert(
//         header::CONTENT_TYPE,
//         header::HeaderValue::from_static("application/json; charset=utf-8"),
//     );
//     let mut cache = Cache::with_capacity(size);
//     serde_json::to_writer(&mut cache, &json).unwrap();
//     res.set_body(Some(Body::Bytes(cache.into_inner())));
//     res.set_status_code(StatusCode::OK)
// }
