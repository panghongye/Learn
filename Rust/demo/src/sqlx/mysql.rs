// https://github.com/launchbadge/sqlx
use sqlx::mysql::MySqlPoolOptions;

// #[async_std::main]
#[tokio::main]
// #[actix_web::main]
async fn main() -> Result<(), sqlx::Error> {
    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .connect("mysql://root:rootroot@localhost/test")
        .await?;

    let row: (i64,) = sqlx::query_as("SELECT ?")
        .bind(150_i64)
        .fetch_one(&pool)
        .await?;
    assert_eq!(row.0, 150);
    Ok(())
}
