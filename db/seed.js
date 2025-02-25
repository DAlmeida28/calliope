require('dotenv').config();
const client = require(`./client.js`);

const { registerUser } = require(`./users.js`);
const { createSynths } = require(`./synths.js`);
const { createReviews } = require(`./reviews.js`);

const dropTables = async () => {
  try{
  
  await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS synths;
    DROP TABLE IF EXISTS users;
    `);

  } catch (err) {
    console.log(err);
  }
}

const createTables = async () => {
  try{

    await client.query(`
      CREATE TABLE users(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      username VARCHAR(40) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL
      );
      
      CREATE TABLE synths(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      synth_name VARCHAR(60) UNIQUE,
      synth_type VARCHAR(10) NOT NULL
      );

      CREATE TABLE reviews(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      review_score INT NOT NULL CHECK (review_score >= 1 AND review_score <= 5),
      reviewed_by UUID NOT NULL REFERENCES users(id),
      synth_reviewed UUID NOT NULL REFERENCES synths(id),
      review_text TEXT
      );
      `)

    
  } catch(err){
    console.log(err);
  }
}

const dataseed = async () => {

  console.log(`CONNECTING TO DATABASE.`);
  client.connect();
  console.log(`CONNECTED TO DATABASE.`);

  console.log(`Dropping tables.`);
  await dropTables();
  console.log(`Tables Dropped.`);

  console.log(`Creating tables.`);
  await createTables();
  console.log(`Tables Created.`);

  console.log(`Creating Users.`);
  const test1 = await registerUser('test', 'test1');
  const test2 = await registerUser('test2', 'test2');
  const synth_nerd = await registerUser('synth_nerd', 'ilovesynths');
  const music = await registerUser('music', 'ilikemusic');
  console.log(`Users created.`);

  console.log(`Creating Synths.`);
  const octa = await createSynths('Octatrack', 'Sampler');
  const irid = await createSynths('Iridium', 'Wavetable');
  const easle = await createSynths('Buchla Music Easle', 'Modular');
  console.log(`Created Synths.`);

  console.log(`Creating Reviews.`);
  await createReviews('4', `${test1.id}`, 'THIS SYNTH IS AMAZING', `${octa.id}`);
  await createReviews('5', `${synth_nerd.id}`, 'I love this instrument', `${octa.id}`);
  await createReviews('1', `${music.id}`, 'None of the features work, bad.', `${irid.id}`);
  console.log(`Reviews Created`);


  console.log(`Disconnecting from DB`);
  client.end();
}

dataseed();