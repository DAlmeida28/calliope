require('dotenv').config();
const client = require(`./db/client.cjs`);
client.connect();

const { registerUser, loginUser, loginToken } = require(`./db/users.cjs`);
const { fetchSynths, getSynth } = require(`./db/synths.cjs`);
const { fetchItemReviews } = require(`./db/reviews.cjs`);

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.get(`/api/v1/items/:itemid/reviews`, async (req, res, next) => {

  try {
    const { itemid } = req.params;
    const reviewsOfSynth = await fetchItemReviews(itemid);
    res.send(reviewsOfSynth);
  } catch(err) {
    console.log(err);
  }
})

app.get(`/api/v1/items/:itemid`, async (req, res, next) => {

  try {
    const { itemid } = req.params;
    const retrievedSynth = await getSynth(itemid);
    res.send(retrievedSynth);
  } catch (err) {
    console.log(err);
  }

})

app.get(`/api/v1/items`, async (req, res, next) => {

  try {
    const retrievedItems = await fetchSynths();
    res.send(retrievedItems);
  } catch (err) {
    next(err)
  }
})

app.get('/api/v1/me', async (req,res, next) =>{
  try {
    const user = await loginToken(req.headers.authorization);
    res.send({ user });
  } catch(err){
    console.log(err);
  }
})

app.post(`/api/v1/login`, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.send({ token: token });
  } catch (err) {
    res.send({ message: `Bad Credentials.` });
  }
})

app.post(`/api/v1/register`, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userCreated = await registerUser(username, password);
    res.send(`${userCreated.username} created successfully.`);
  } catch (err) {
    next(err);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
})