use super::model::User;
use rocket::serde::json::{json, Json, Value};

pub fn stage() -> rocket::fairing::AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async {
        rocket.mount("/", routes![user_register])
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
