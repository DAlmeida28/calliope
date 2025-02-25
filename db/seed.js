require('dotenv').config();

const client = require(`./client.js`);

const dropTables = async () => {
  try{
  
  await client.query(`
    DROP TABLE IF EXISTS users;
    `);

  } catch (err) {
    console.log(err);
  }
}

const createTables = async () => {
  try{

    await client.query(`
      CREATE TABLE users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      username VARCHAR(40) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL
      );`)
  } catch(err){
    console.log(err);
  }
}

const dataseed = async () => {

  console.log(`CONNECTING TO DATABASE`);
  client.connect();
  console.log(`CONNECTED TO DATABASE`);

  console.log(`Dropping tables.`);
  await dropTables();
  console.log(`Tables Dropped`);

  console.log(`Creating tables`);
  await createTables();
  console.log(`Tables Created.`);

  console.log(`Disconnecting from DB`);
  client.end();
}

dataseed();