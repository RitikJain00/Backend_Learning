import { getClient } from './index'

async function getCompleteData() {

  const client = await getClient();

  const getAllData = `
  SELECT * FROM users as u
  inner join todos as t
  On u.id = t.user_id`

  const response = await client.query(getAllData);

  console.log(`Users :-`)

  console.log(response.rows)
}

getCompleteData()