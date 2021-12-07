pub fn stage() -> rocket::fairing::AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async {
        rocket.mount("/", routes![user_register])
    })
}

#[post("/user_register", format = "json", data = "<data>")]
async fn user_register() -> Value {
    json!(Res{})
}
// fn user_login(){}
