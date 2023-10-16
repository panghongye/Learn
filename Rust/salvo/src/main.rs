use once_cell::sync::OnceCell;
use salvo::prelude::*;
use serde::{Deserialize, Serialize};
use sqlx::{query, FromRow, PgPool};
// use std::env;

static POSTGRES: OnceCell<PgPool> = OnceCell::new();

#[inline]
pub fn get_postgres() -> &'static PgPool {
    unsafe { POSTGRES.get_unchecked() }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResultData<T> {
    data: T,
    code: i64, // 0成功 1失败
    msg: String,
}

#[derive(FromRow, Serialize, Debug, Deserialize)]
pub struct User {
    id: Option<i64>,
    pub name: String,
    pub password: String,
    pub intro: Option<String>,
}

#[handler]
pub async fn get_user(req: &mut Request, res: &mut Response) {
    let id = req.query::<i64>("id").unwrap();
    let mut data = sqlx::query_as::<_, User>("select * from users where id = $1")
        .bind(id)
        .fetch_one(get_postgres())
        .await
        .unwrap();
    data.password = "".to_string();
    let result_data = ResultData::<User> {
        data,
        code: 0,
        msg: "".to_string(),
    };
    res.render(serde_json::to_string(&result_data).unwrap());
}

#[handler]
pub async fn user_login(req: &mut Request, res: &mut Response) {
    let user = req.parse_json::<User>().await.unwrap();
    let data = query!(
        r#" SELECT * FROM users WHERE name=$1 AND password=$2"#,
        user.name,
        user.password
    )
    .fetch_one(get_postgres())
    .await
    .unwrap();
    let user = User {
        id: Some(data.id),
        name: data.name,
        intro: Some(data.intro.unwrap()),
        password: "".to_string(),
    };
    let result_data = ResultData::<User> {
        data: user,
        code: 0,
        msg: "".to_string(),
    };
    res.render(serde_json::to_string(&result_data).unwrap());
}
#[handler]
pub async fn user_register(req: &mut Request, res: &mut Response) {
    // 查找用户名是否存在
    // 存在则返回已注册
    // 不存在则新增
    let user = req.parse_json::<User>().await.unwrap();
    let data = query!(
        r#" SELECT * FROM users WHERE name=$1 AND password=$2"#,
        user.name,
        user.password
    )
    .fetch_one(get_postgres())
    .await
    .unwrap();
    let user = User {
        id: Some(data.id),
        name: data.name,
        intro: None,
        password: "".to_string(),
    };
    let result_data = ResultData::<User> {
        data: user,
        code: 0,
        msg: "".to_string(),
    };
    res.render(serde_json::to_string(&result_data).unwrap());
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    // postgresql connect info
    // let pool = PgPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let pool = PgPool::connect("postgres://postgres:rootroot@localhost/test")
        .await
        .unwrap();
    POSTGRES.set(pool).unwrap();

    // router
    let router = Router::with_path("").get(get_user).post(user_login);
    let acceptor = TcpListener::new("localhost:5800").bind().await;
    Server::new(acceptor).serve(router).await;
}
