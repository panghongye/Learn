#[macro_use]
extern crate rocket;
use rocket::http::CookieJar;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/<name>")]
fn name(name: &str) -> String {
    format!("route: /{}!", name)
}

#[get("/query?<name>")]
fn query(name: &str) -> String {
    format!("query: name= {}!", name)
}

#[get("/cookie")]
fn cookie(cookies: &CookieJar<'_>) -> Option<String> {
    cookies
        .get("message")
        .map(|crumb| format!("Message: {}", crumb.value()))
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, name, cookie, query])
}
