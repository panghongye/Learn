pub fn stage() -> rocket::fairing::AdHoc {
    rocket::fairing::AdHoc::on_ignite("API", |rocket| async { rocket.mount("/", routes![]) })
}


// fn user_register(){}
// fn user_login(){}