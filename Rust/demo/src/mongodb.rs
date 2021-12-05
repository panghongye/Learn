// https://github.com/mongodb/mongo-rust-driver

use mongodb::{
    bson::{doc, Document},
    options::ClientOptions,
    Client,
};
#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let client_options = ClientOptions::parse("mongodb+srv://root:rootroot@phy.ieub9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",).await?;
    let client = Client::with_options(client_options)?;
    let db = client.database("test");
    let collection = db.collection::<Document>("books");
    let docs = vec![
        doc! { "title": "1984", "author": "George Orwell" },
        doc! { "title": "Animal Farm", "author": "George Orwell" },
        doc! { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    ];
    collection.insert_many(docs, None).await?; // Insert some documents into the "mydb.books" collection.
    Ok(())
}
