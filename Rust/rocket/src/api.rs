use super::model::RegisterUser;
use rocket::{
    fairing::AdHoc,
    serde::json::{serde_json::json, Json, Value},
};
use sqlx::mysql::MySqlPool;
use std::env;
type Result<T, E = rocket::response::Debug<sqlx::Error>> = std::result::Result<T, E>;

pub fn stage() -> AdHoc {
    rocket::fairing::AdHoc::on_ignite("api", |rocket| async {
        rocket.mount("/api", routes![add_data])
    })
}
#[get("/test")]
pub async fn add_data() -> Result<MySqlQueryResult> {
    // let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;
    let pool = MySqlPool::connect(("mysql://root:rootroot@localhost:3306/test")).await?;
    let res = sqlx::query("select now()").execute(&pool).await?;
    Ok(res)
}
