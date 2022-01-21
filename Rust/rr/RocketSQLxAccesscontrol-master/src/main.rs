mod sql;

#[macro_use] extern crate rocket;
extern crate serde;

use serde::{Serialize, Deserialize};
use chrono::prelude::*;
use rocket::serde::json::Json;
use rocket::http::Status;
#[derive(Serialize, Deserialize)]
pub struct User {
    username: String,
    student_id: String,
    pos: String,
}

#[derive(Serialize, Deserialize)]
pub struct Input {
    username: String,
    pos: String,
    time: String,
}

#[post("/get_in", format = "json", data = "<user>")]
async fn inside(user: Json<User>) -> Status {
    let username = user.username.clone();
    let pos = user.pos.clone();
    let time= Local::now().to_string();
    sql::add_data(Input {username,pos,time,}).await;
    Status::Accepted
}

#[get("/all_data")]
async fn search() -> Json<Vec<Input>>{
    let result = sql::list_data().await;
    Json(result.unwrap())
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![inside, search])
}
