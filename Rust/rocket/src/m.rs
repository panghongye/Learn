#[macro_use]
extern crate rocket;

mod json;
#[cfg(test)]
mod tests;

mod api;
mod model;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(api::stage()).attach(json::stage())
}
