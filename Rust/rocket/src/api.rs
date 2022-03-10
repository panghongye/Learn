use super::model::RegisterUser;
use rocket::{
    fairing::AdHoc,
    serde::json::{serde_json::json, Json, Value},
};
use sqlx::mysql::MySqlPool;
use std::env;
type Result<T, E = rocket::response::Debug<sqlx::Error>> = std::result::Result<T, E>;


pub fn stage() -> AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async {
        rocket.mount("/", routes![add_data])
    })
}
#[get("/add_data")]
pub async fn add_data() -> Result<()> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;
    sqlx::query("DELETE FROM table").execute(&pool).await?;
    Ok(())
}
