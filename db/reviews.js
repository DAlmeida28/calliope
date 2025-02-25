const client = require(`./client.js`);

const createReviews = async (review_score, reviewed_by, review_text, synth_reviewed) => {

  try{
  await client.query(`
    INSERT INTO reviews(review_score, reviewed_by, review_text, synth_reviewed)
    VALUES('${review_score}', '${reviewed_by}', '${review_text}', '${synth_reviewed}')
    ;`);
    
}catch (err){
  console.log(err);
}}

module.exports = { 
  createReviews
}