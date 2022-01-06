use crate::Input;
use sqlx::{SqlitePool, Error};
use std::env;


pub async fn add_data(data: Input) -> anyhow::Result<()> {
    let pool = SqlitePool::connect(&env::var("DATABASE_URL")?).await?;
    let mut conn = pool.acquire().await?;
    let add = sqlx::query!(
        r#"INSERT INTO student (name, student_id, pos, time) VALUES ($1, $2, $3, $4)"#, data.username, data.student_id, data.pos, data.time)
        .execute(&mut conn).await?;
    Ok(())
}

pub async fn list_data() -> anyhow::Result<(Vec<crate::Input>)> {
    let pool = SqlitePool::connect(&env::var("DATABASE_URL")?).await?;
    let result = sqlx::query!(r#"
        SELECT name, student_id, pos, time
        FROM student
        ORDER BY name
    "#).fetch_all(&pool).await?;
    let mut ret: Vec<crate::Input> = Vec::new();
    for i in result {
        ret.push(
            crate::Input {
                username: i.name.unwrap().clone(),
                student_id: i.student_id.clone(),
                pos: i.pos.parse::<i32>().unwrap().clone(),
                time: i.time.clone(),
            }
        );
    }
    Ok(ret)
}