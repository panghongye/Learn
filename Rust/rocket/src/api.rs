use super::model::User;
use rocket::{serde::json::{json, Json, Value}, fairing::{self, AdHoc}, Build, Rocket};
use sqlx::SqlitePool;
 

async fn db(rocket: Rocket<Build>) -> fairing::Result {
    match SqlitePool::connect("./chronology.db").await {
        Ok(pool) => Ok(rocket.manage(pool)),
        Err(e) => {
            rocket::error!("Failed to connect to database: {}", e);
            Err(rocket)
        }
    }
}



pub fn stage() -> AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async {
        rocket.attach(AdHoc::try_on_ignite("SQLx Migrations", db))
        .mount("/", routes![user_register])
    })
}

#[post("/user_register", data = "<data>")]
async fn user_register(data: Json<User>) -> Value {
    json!({ "code":0, "msg":"ok","data":{
        "id":data.id,
        "name":data.name,
    }})
}
// fn user_login(){}
