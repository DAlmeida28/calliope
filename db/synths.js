const client = require('./client.js');

const createSynths = async (synth_name) => {
  
  try{
    const { rows } = await client.query(`
      INSERT INTO synths(synth_name)
      VALUES('${synth_name}')
      RETURNING *;
      `);

      const createdSynth = rows[0];
      return createdSynth;
  } catch(err){
    console.log(err);
  }
}

const fetchSynths = async () => {
  
  try{
    const { rows: allSynths } = await client.query(`
      SELECT * FROM synths;
      `);

      return allSynths;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createSynths,
  fetchSynths
}