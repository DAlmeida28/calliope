const client = require('./client.cjs');

const createSynths = async (synth_name, synth_type) => {
  
  try{
    const { rows } = await client.query(`
      INSERT INTO synths(synth_name, synth_type)
      VALUES('${synth_name}', '${synth_type}')
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

const getSynth = async (id) =>{
  try{
    const{ rows } = await client.query(`
      SELECT * FROM synths WHERE id='${id}';
      `);
      
      const singleSynth = rows[0];
      return singleSynth;

  } catch(err){
    console.log(err);
  }
}

module.exports = {
  createSynths,
  fetchSynths,
  getSynth
}