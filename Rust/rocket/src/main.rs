#[macro_use]
extern crate rocket;

mod api;
mod json;
mod model;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(api::stage()).attach(json::stage())
}
