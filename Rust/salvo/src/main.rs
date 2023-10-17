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
    data: Option<T>, // 业务数据
    code: i64,       // 0业务成功 1业务失败
    msg: String,     // 失败原因
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
    let data = sqlx::query_as::<_, User>("select * from users where id = $1")
        .bind(id)
        .fetch_one(get_postgres())
        .await;
    match data {
        Ok(r) => {
            let mut r = r;
            r.password = "".to_string();
            let result_data = ResultData::<User> {
                data: Some(r),
                code: 0,
                msg: "".to_string(),
            };
            res.render(serde_json::to_string(&result_data).unwrap());
        }
        Err(_) => {
            let rd = ResultData::<User> {
                data: None,
                code: 0,
                msg: "没有该用户".to_string(),
            };
            res.render(serde_json::to_string(&rd).unwrap());
        }
    };
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
    .await;

    match data {
        Ok(r) => {
            println!("user_login ok  --{:?}", r);
            let mut r = r;
            r.password = "".to_string();
            let u = User {
                id: Some(r.id),
                name: r.name,
                password: "".to_string(),
                intro: r.intro,
            };
            let result_data = ResultData::<User> {
                data: Some(u),
                code: 0,
                msg: "登录成功".to_string(),
            };
            res.render(serde_json::to_string(&result_data).unwrap());
        }
        Err(_) => {
            let rd = ResultData::<User> {
                data: None,
                code: 1,
                msg: "用户没有注册".to_string(),
            };
            res.render(serde_json::to_string(&rd).unwrap());
        }
    };
}

#[handler]
pub async fn user_register(req: &mut Request, res: &mut Response) {
    let par = req.parse_json::<User>().await.unwrap();
    // 查找用户名是否存在
    let user = query!(r#" SELECT * FROM users WHERE name=$1"#, par.name,)
        .fetch_one(get_postgres())
        .await;
    // 存在则返回已注册
    match user {
        Ok(_) => {
            let result_data = ResultData::<User> {
                data: None,
                code: 1,
                msg: "用户名已存在".to_string(),
            };
            res.render(serde_json::to_string(&result_data).unwrap());
        }
        Err(_) => {
            // 插入新用户
            let r = query!(
                r#" INSERT INTO users (name, password) VALUES ($1, $2)"#,
                par.name,
                par.password,
            )
            .fetch_one(get_postgres())
            .await;
            // TODO 这里应该返回注册成功的id
            let result_data = ResultData::<User> {
                data: None,
                code: 0,
                msg: "注册成功".to_string(),
            };
            res.render(serde_json::to_string(&result_data).unwrap());
        }
    };
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    // postgresql connect info
    // let pool = PgPool::connect(&std::env::var("DATABASE_URL")?).await?;
    let pool = PgPool::connect("postgres://postgres:rootroot@localhost/test")
        .await
        .unwrap();
    POSTGRES.set(pool).unwrap();

    // router
    let router = Router::with_path("user")
        .get(get_user)
        .push(Router::with_path("login").post(user_login))
        .push(Router::with_path("register").post(user_register));

    let acceptor = TcpListener::new("localhost:5800").bind().await;
    Server::new(acceptor).serve(router).await;
}
