use rocket::{serde::{
    // json::{Json, Value},
    Deserialize, Serialize,
}, figment::value::Map};

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Res {
    pub code: u8,
    pub data: Map<String, String>,
    pub msg: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: Option<u32>,
    pub name: String,
}
