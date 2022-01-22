use sqlx::mysql::MySqlPool;
use std::env;
use structopt::StructOpt;
extern crate rand; 
use rand::Rng;

#[derive(StructOpt)]
struct Args {
    #[structopt(subcommand)]
    cmd: Option<Command>,
}

#[derive(StructOpt)]
enum Command {
    Add { description: String },
    Done { id: u64 },
}

const DATABASE_URL: &str="mysql://root:rootroot@localhost:3306/test";


#[async_std::main]
#[paw::main]
async fn main(args: Args) -> anyhow::Result<()> {
    // let pool = MySqlPool::connect(&env::var("DATABASE_URL")?).await?;
    let pool = MySqlPool::connect(DATABASE_URL).await?;
    let id= add_todo(&pool, rand::thread_rng().gen_range(0..100).to_string()).await?;
    complete_todo(&pool, id).await?;
    list_todos(&pool).await?;
    // match args.cmd {
    //     Some(Command::Add { description }) => {
    //         println!("Adding new todo with description '{}'", &description);
    //         let todo_id = add_todo(&pool, description).await?;
    //         println!("Added new todo with id {}", todo_id);
    //     }
    //     Some(Command::Done { id }) => {
    //         println!("Marking todo {} as done", id);
    //         if complete_todo(&pool, id).await? {
    //             println!("Todo {} is marked as done", id);
    //         } else {
    //             println!("Invalid id {}", id);
    //         }
    //     }
    //     None => {
    //         println!("Printing list of all todos");
    //         list_todos(&pool).await?;
    //     }
    // }
    Ok(())
}

async fn add_todo(pool: &MySqlPool, description: String) -> anyhow::Result<u64> {
    // Insert the task, then obtain the ID of this row
    let todo_id = sqlx::query!(r#"INSERT INTO todos ( description )VALUES ( ? )"#,description).execute(pool).await?.last_insert_id();
    Ok(todo_id)
}

async fn complete_todo(pool: &MySqlPool, id: u64) -> anyhow::Result<bool> {
    let rows_affected = sqlx::query!(r#"UPDATE todos SET done = TRUE WHERE id = ?"#,id)
    .execute(pool)
    .await?
    .rows_affected();
    Ok(rows_affected > 0)
}

async fn list_todos(pool: &MySqlPool) -> anyhow::Result<()> {
    let recs = sqlx::query!( r#" SELECT id, description, done FROM todos ORDER BY id "# )
    .fetch_all(pool)
    .await?;
    // NOTE: Booleans in MySQL are stored as `TINYINT(1)` / `i8`
    //       0 = false, non-0 = true
    for rec in recs {
        println!(
            "- [{}] {}: {}",
            if rec.done != 0 { "x" } else { " " },
            rec.id,
            &rec.description,
        );
    }

    Ok(())
}
