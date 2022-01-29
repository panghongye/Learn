#[macro_use]
extern crate rocket;

mod json;
mod api;
mod model;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(api::stage()).attach(json::stage())
}
