use rocket::{serde::{Deserialize, Serialize,json::{ Value }}};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Res {
    pub code: u8,
    pub data: Value,
    pub msg: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: Option<u32>,
    pub name: Option<String>,
    pub email :Option<String>,
    pub password :Option<String>,
}

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct RegisterUser {
    pub name: String,
    pub email :String,
    pub password :String,
}

