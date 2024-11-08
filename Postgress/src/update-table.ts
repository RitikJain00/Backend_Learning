import { getClient } from "./index"

const updataeTable = async (status: boolean , user: number) => { 
  const client = await getClient();

  const updateTableQuery = `UPDATE todos SET done = $1 WHERE user_id = $2`
  const updateValues = [status,user]
  await client.query(updateTableQuery,updateValues);

  console.log(`table Updated`)
}

updataeTable(true,2);