import { getClient } from './index'

async function insertData () {

  try {
    const client = await getClient();
  
  const insertUserData = `
  INSERT INTO users
  (username, email,password)
  VALUES ($1,$2,$3) RETURNING id`;
  const userValues = ['Keshav','keshav@gmail.com','keshav']

  let response = await client.query(insertUserData, userValues)

  const insertTodoData = `
  INSERT INTO todos
  (title, description, user_id)
  VALUES ($1,$2,$3)`

  const todoValues = ['Buy Vegetables','Buy Vegetables at 7:00', response.rows[0].id]

  await client.query(insertTodoData,todoValues);

  console.log(`Data inserted Successfully`)
  }
  catch(error){
    console.log(`There is an error while inserting data`, error)
  }
  
}

insertData ();