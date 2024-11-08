import { Client } from 'pg'

export async function getClient() {
  const client = new Client ({
    connectionString: 'postgresql://neondb_owner:M84jCOBhKnkv@ep-cool-mud-a5dtgbyy.us-east-2.aws.neon.tech/neondb?sslmode=require'
  })

  await client.connect()
  return client
}


