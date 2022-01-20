use crate::Input;
use sqlx::{MySqlPool};
use std::env;

pub async fn add_data(data: Input) -> anyhow::Result<()> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;
    let mut conn = pool.acquire().await?;
    let add = sqlx::query!(
        r#"INSERT INTO student (name, student_id, pos, time) VALUES (?, ?, ?, ?)"#, data.username, data.student_id, data.pos, data.time)
        .execute(&mut conn).await?;
    Ok(())
}

pub async fn list_data() -> anyhow::Result<Vec<crate::Input>> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;
    let result = sqlx::query!(r#"SELECT name, student_id, pos, time FROM student ORDER BY name"#).fetch_all(&pool).await?;
    let mut ret: Vec<crate::Input> = Vec::new();
    for i in result {
        ret.push(
            crate::Input {
                username: i.name,
                student_id: i.student_id,
                pos: i.pos,
                time: i.time,
            }
        );
    }
    Ok(ret)
}