const client = require(`./client.cjs`);

const createReviews = async (review_score, reviewed_by, review_text, synth_reviewed) => {

  try{
  await client.query(`
    INSERT INTO reviews(review_score, reviewed_by, review_text, synth_reviewed)
    VALUES('${review_score}', '${reviewed_by}', '${review_text}', '${synth_reviewed}')
    ;`);
    
}catch (err){
  console.log(err);
}}

const fetchItemReviews = async (synthId) => {
  
  try{
    const { rows: synthReviews } = await client.query(`
      SELECT * FROM reviews WHERE synth_reviewed='${synthId}';
      `);
      
      return synthReviews;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { 
  createReviews,
  fetchItemReviews
}