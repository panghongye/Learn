// #![allow(unused_must_use)]
#[macro_use]
extern crate rbatis;
#[macro_use]
extern crate lazy_static;

use rbatis::crud::CRUD;
use rbatis::rbatis::Rbatis;
use salvo::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;

lazy_static! {
  pub static ref RB:Rbatis = Rbatis::new(); // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，无需担心线程竞争
}

#[crud_table]
#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct TabTodo {
    pub id: Option<u64>,
    pub body: Option<String>,
    pub done: Option<bool>,
}

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct Res<T> {
    pub data: Option<T>,
    pub code: u64,
    pub msg: String,
}

#[fn_handler]
async fn lists(res: &mut Response) {
    let t = RB.fetch_list::<TabTodo>().await.unwrap();
    let r = Res::<Vec<TabTodo>> {
        data: Some(t),
        code: 0,
        msg: String::from("ok"),
    };
    res.render(Text::Json(serde_json::to_string(&r).unwrap()));
}

#[fn_handler]
async fn update(req: &mut Request, res: &mut Response) {
    let mut t = req.parse_json::<TabTodo>().await.unwrap();
    let mut rs = Res::<TabTodo> {
        data: None,
        code: 0,
        msg: String::from("ok"),
    };
    match t.id {
        None => {
            let r = RB.save(&t, &[]).await.unwrap();
            t.id = Some(r.last_insert_id.unwrap() as u64);
        }
        Some(_) => {
            let new_id = RB.update_by_column::<TabTodo>("id", &t).await.unwrap();
            if new_id == 0 {
                rs.code = 1;
                rs.msg = String::from("记录不存在")
            }
        }
    }
    rs.data = Some(t);
    res.render(Text::Json(serde_json::to_string(&rs).unwrap()));
}

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::config::Config::new().console()).unwrap();
    // RB.link("sqlite://target/sqlite.db");
    RB.link("mysql://root:rootroot@localhost:3306/test")
        .await
        .unwrap();
    log::info!("linking database successful!");
    Server::new(TcpListener::bind("127.0.0.1:7878"))
        .serve(Router::new().get(lists).post(update))
        .await;
    log::info!("server quit!");
}
