const bcrypt = require(`bcrypt`);
const client = require(`./client.js`);

const registerUser = async (uNameToRegister, pwToRegister) => {

  const hashpw = await bcrypt.hash(pwToRegister, 12);

try{
  const { rows } = await client.query (`
    INSERT INTO users(username, password)
    VALUES('${uNameToRegister}', '${hashpw}')
    RETURNING * ;`);
  
    return(rows [0]);
  } catch(err){

   console.log(err);
  }
}

module.exports = {
  registerUser
}