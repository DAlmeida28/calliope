const bcrypt = require(`bcrypt`);
const client = require(`./client.js`);
const jwt = require(`jsonwebtoken`);

const registerUser = async (uNameToRegister, pwToRegister) => {

  const hashpw = await bcrypt.hash(pwToRegister, 12);

  try {
    const { rows } = await client.query(`
    INSERT INTO users(username, password)
    VALUES('${uNameToRegister}', '${hashpw}')
    RETURNING * ;`);
    
    const userCreated = rows[0];
    return userCreated;
  } catch (err) {

    console.log(err);
  }
}

const loginUser = async (username, password) => {

  try {
    const { rows } = await client.query(`
    SELECT * FROM users WHERE username='${username}';`);

    const user = rows[0];
    if (user) {
      const isPassswordValid = await bcrypt.compare(password, user.password);
      if (isPassswordValid) {
        const token = await jwt.sign({ username: user.username }, process.env.SECRET);
        return token;
      }
    } else {
      throw new Error('Bad Credentials');
    }
  } catch (err) {
    throw new Error(`Bad Credentials`);
  }
}


module.exports = {
  registerUser,
  loginUser
}