const jwt = require('jsonwebtoken');
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

const fetchMyReviews = async (authToken) => {
  try{
    const userVerify = await jwt.verify(authToken, process.env.SECRET);
    //Can I get an user UUID fromt this? 
    console.log(userVerify);
    const { rows } = await client.query(`
        SELECT * FROM reviews WHERE reviewed_by='${userVerify.username}';
        `);
      
        userReviews = rows[0];
        return userReviews;
  }catch(err){
console.log(err);
    }
}

const deleteSelectedReview = async (authToken, reviewid) => {
  try{
    const { rows } = verifyDelete = await jwt.verify(authToken, process.env.SECRET);
    
    await client.query(`
      DELETE FROM reviews WHERE id='${reviewid}' AND reviewed_by='${verifyDelete.username}'
      `);
      return rows[0];
    
  } catch(err) {

  }
}

module.exports = { 
  createReviews,
  fetchItemReviews,
  fetchMyReviews,
  deleteSelectedReview
}