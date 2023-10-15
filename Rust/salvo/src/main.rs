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
#[derive(FromRow, Serialize, Debug, Deserialize)]
pub struct User {
    pub id: Option<i64>,
    pub username: String,
    pub password: Option<String>,
}

#[derive(FromRow, Serialize, Debug, Deserialize)]
struct UserInfo {
    pub id: i64,
    pub username: String,
}

#[handler]
pub async fn get_user(req: &mut Request, res: &mut Response) {
    let id = req.query::<i64>("id").unwrap();
    println!("get_user id {}", id);
    let data = sqlx::query_as::<_, UserInfo>("select * from users where id = $1")
        .bind(id)
        .fetch_one(get_postgres())
        .await
        .unwrap();
    let d = serde_json::to_string(&data).unwrap();
    res.render(d);
}

#[handler]
pub async fn user_login(req: &mut Request, res: &mut Response) {
    let user = req.parse_json::<User>().await.unwrap();
    let data = query!(
        r#" SELECT id,username FROM users WHERE username=$1 AND password=$2"#,
        user.username,
        user.password
    )
    .fetch_one(get_postgres())
    .await
    .unwrap();
    let user = User {
        username: data.username,
        id: Some(data.id),
        password: None,
    };
    res.render(serde_json::to_string(&user).unwrap());
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
