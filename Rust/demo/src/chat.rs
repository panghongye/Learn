use std::collections::HashMap;

#[derive(Debug)]
struct User {
    id: String,
    name: String,
    email: String,
}
#[derive(Debug)]
struct Room {
    id: String,
    name: String,
    users: HashMap<String, User>,
}

#[derive(Debug)]
struct Server {
    rooms: HashMap<String, Room>,
}

fn main() {
    let server = Server {
        rooms: HashMap::new(),
    };

    println!(">>>>>{:?}", server.rooms);
}
