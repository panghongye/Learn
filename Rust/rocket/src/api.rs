use super::model::RegisterUser;
use rocket::{
    fairing::AdHoc,
    serde::json::{serde_json::json, Json, Value},
};
use sqlx::mysql::MySqlPool;
use std::env;

pub fn stage() -> AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async { rocket.mount("/", routes![]) })
}

pub async fn add_data()  {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;

    sqlx::query("DELETE FROM table").execute(&pool).await?;
}
