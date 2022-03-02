use rocket::{serde::json::{ Json, Value, serde_json::json}, fairing::{self, AdHoc}, Build, Rocket, State};
use sqlx::MySqlPool;
use super::model::{RegisterUser};

async fn db(rocket: Rocket<Build>) -> fairing::Result {
    // let pool = MySqlPool::connect(database_url).await?;
    match MySqlPool::connect("mysql://root:rootroot@localhost:3306/test").await {
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
async fn user_register(data: Json<RegisterUser>,pool: &State<MySqlPool>) -> Value {
    let recs = sqlx::query!( r#" SELECT id, description, done FROM todos ORDER BY id "# ).fetch_all(*pool).await;
    // for rec in recs {
    //     println!(
    //         "- [{}] {}: {}",
    //         if rec.done != 0 { "x" } else { " " },
    //         rec.id,
    //         &rec.description,
    //     );
    // }

    let result = sqlx::query!("SELECT * FROM users WHERE id = ?", 22)
        .execute(&mut *pool)
        .await;

    // Ok((result.rows_affected() == 1).then(|| ()));

    json!({ "code":0, "msg":"ok","data":22})
}
// fn user_login(){}
