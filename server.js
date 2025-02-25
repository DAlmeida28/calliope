require('dotenv').config();
const express = require('express');

const app = express();

app.post(`/api/v1/register`, (req, res, next) => {
  console.log(`Register Route`);
})

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
})