#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/a")]
fn a() -> String {
    "aaaaaaa".to_string()
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, a])
}
