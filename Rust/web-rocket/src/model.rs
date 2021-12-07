use rocket::serde::{
    json::{Json, Value},
    Deserialize, Serialize,
};

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Res {
    code: u8,
    // data: json,
    msg: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: u8,
    pub name: String,
}
