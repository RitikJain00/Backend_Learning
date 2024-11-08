import { getClient } from './index'

async function createtable() {

  const crateUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`

  const client = await getClient();

  await client.query(crateUserTableQuery);

  const createTodoTableQuery = `
  CREATE TABLE  IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT ,
    user_id INTEGER REFERENCES users(id),
    done BOOLEAN DEFAULT false
  );`

  await client.query(createTodoTableQuery);

  console.log("Table Created Successfully")

}

createtable();