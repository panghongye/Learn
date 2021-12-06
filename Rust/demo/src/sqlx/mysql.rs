// https://github.com/launchbadge/sqlx

use anyhow::Result;
use async_std::task;
use async_trait::async_trait;

pub struct MySQL {
    pool: sqlx::Pool<sqlx::MySqlConnection>,
}

impl MySQL {
    pub fn new() -> Self {
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is required");
        let pool = task::block_on(sqlx::MySqlPool::new(database_url.as_str()))
            .expect("Failed to create pool");
        Self { pool }
    }
}


