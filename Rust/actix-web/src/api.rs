use super::model::User;
use actix_web::{error, web, Error, HttpResponse};
use futures::StreamExt;
use sqlx::{mysql::MySqlPoolOptions, pool::PoolOptions, MySql, Pool};

struct MY_SQL {}

impl MY_SQL {
    async fn init(&self) {
        let pool = MySqlPoolOptions::new()
            .max_connections(5)
            .connect("mysql://root:rootroot@localhost/test")
            .await;

    }
}

pub async fn user_register(mut payload: web::Payload) -> Result<HttpResponse, Error> {
    let mut body = web::BytesMut::new();
    while let Some(chunk) = payload.next().await {
        let chunk = chunk?;
        // limit max size of in-memory payload 256k
        if (body.len() + chunk.len()) > 262_144 {
            return Err(error::ErrorBadRequest("overflow"));
        }
        body.extend_from_slice(&chunk);
    }
    let mut obj = serde_json::from_slice::<User>(&body)?;
    obj.name = "sss".to_string();
    Ok(HttpResponse::Ok().json(obj)) // <- send response
}

async fn no_null(mut payload: web::Payload) -> Result<User, Error> {
    let mut body = web::BytesMut::new();
    while let Some(chunk) = payload.next().await {
        let chunk = chunk?;
        // limit max size of in-memory payload 256k
        if (body.len() + chunk.len()) > 262_144 {
            return Err(error::ErrorBadRequest("overflow"));
        }
        body.extend_from_slice(&chunk);
    }
    Ok(serde_json::from_slice::<User>(&body)?)
}

pub mod test {
    use actix_web::{error, web, Error, HttpResponse};
    use futures::StreamExt;
    use json::JsonValue;
    use serde::{Deserialize, Serialize};
    #[derive(Debug, Serialize, Deserialize)]
    pub struct MyObj {
        name: String,
        number: i32,
    }

    pub async fn test_manual(mut payload: web::Payload) -> Result<HttpResponse, Error> {
        let mut body = web::BytesMut::new();
        while let Some(chunk) = payload.next().await {
            let chunk = chunk?;
            // limit max size of in-memory payload 256k
            if (body.len() + chunk.len()) > 262_144 {
                return Err(error::ErrorBadRequest("overflow"));
            }
            body.extend_from_slice(&chunk);
        }
        let mut obj = serde_json::from_slice::<MyObj>(&body)?;
        obj.number = 33;
        Ok(HttpResponse::Ok().json(obj)) // <- send response
    }

    pub async fn test_mjsonrust(body: web::Bytes) -> Result<HttpResponse, Error> {
        let result = json::parse(std::str::from_utf8(&body).unwrap()); // return Result
        let injson: JsonValue = match result {
            Ok(v) => v,
            Err(e) => json::object! {"err" => e.to_string() },
        };
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(injson.dump()))
    }
}
