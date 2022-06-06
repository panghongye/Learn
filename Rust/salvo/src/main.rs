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
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TabTodo {
    pub id: Option<u64>,
    pub body: Option<String>,
    pub done: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct Res<T> {
    pub data: Option<T>,
    pub code: u64,
    pub msg: String,
}

#[fn_handler]
async fn hello_world() -> &'static str {
    RB.exec("CREATE TABLE `tab_todo` (`id` int unsigned NOT NULL AUTO_INCREMENT,`body` varchar(255) DEFAULT NULL,PRIMARY KEY (`id`));",vec![])
    .await.unwrap();
    "Hello world"
}

#[fn_handler]
async fn lists(res: &mut Response) {
    let result: Vec<TabTodo> = RB.fetch_list().await.unwrap();
    let r = Res::<Vec<TabTodo>> {
        data: Some(result),
        code: 0,
        msg: String::from("ok"),
    };
    res.render(Text::Json(serde_json::to_string(&r).unwrap()));
}

#[fn_handler]
async fn update(req: &mut Request, res: &mut Response) {
    // let t = req.read::<TabTodo>().await.unwrap();
    let mut t = TabTodo {
        id: req.form::<u64>("id").await,
        body: req.form::<String>("body").await,
        // done: req.param::<bool>("done").unwrap(),
        done: req.form::<bool>("done").await.unwrap(),
    };
    
    match t.id {
        None => {
            let r = RB.save(&t, &[]).await.unwrap().last_insert_id.unwrap();
            t.id = Some(r as u64);
        }
        Some(_) => {
            let r = RB.update_by_column::<TabTodo>("id", &t).await.unwrap();
        }
    }

    res.render(Text::Json(
        serde_json::to_string(&Res::<TabTodo> {
            data: Some(t),
            code: 0,
            msg: String::from("ok"),
        })
        .unwrap(),
    ));
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
        .serve(Router::new().get(lists).post(update))
        .await;
    log::info!("server quit!");
}
