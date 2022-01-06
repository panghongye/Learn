use chronology::web;
use rocket::{
    fairing::{self, AdHoc},
    Build, Rocket,
};
use sqlx::mysql::MySqlPool;

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .attach(AdHoc::try_on_ignite("test", db))
        .mount("/", web::routes())
}

async fn db(rocket: Rocket<Build>) -> fairing::Result {
    match MySqlPool::connect(&env::var("DATABASE_URL")?).await? {
        Ok(pool) => Ok(rocket.manage(pool)),
        Err(e) => {
            rocket::error!("Failed to connect to database: {}", e);
            Err(rocket)
        }
    }
}
