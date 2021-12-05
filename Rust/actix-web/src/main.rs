use actix_web::{middleware, web, App, HttpServer};
use web_::api::{test, user_register};


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    HttpServer::new(|| {
        App::new()
            // enable logger
            .wrap(middleware::Logger::default())
            .data(web::JsonConfig::default().limit(4096)) // <- limit size of the payload (global configuration)
            .service(web::resource("/test_manual").route(web::post().to(test::test_manual)))
            .service(web::resource("/test_manual").route(web::post().to(test::test_mjsonrust)))
            .service(web::resource("/user_register").route(web::post().to(user_register)))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
