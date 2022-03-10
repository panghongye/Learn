// // https://github.com/launchbadge/sqlx

// use async_std::task;

// pub struct MySQL {
//     pool: sqlx::Pool<DB>,
// }

// impl MySQL {
//     pub async fn new() -> Self {
//         let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is required");
//         let pool =sqlx::MySqlPool::connect(database_url).await?;
//         let pool = task::block_on(sqlx::MySqlPool::new(database_url.as_str())).expect("Failed to create pool");
//         Self { pool }
//     }
// }




fn main(){
    print!("{}",10+"w33")
}