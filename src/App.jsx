import { useEffect, useState } from 'react'

const App = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [token, setToken] = useState(localStorage.getItem('token'));
const [displayName, setDisplayName] = useState('');

const authToken = async() => {
  if(token){
    const response = await fetch('/api/v1/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    });

    const responseJsonObject = await response.json();
    setDisplayName(responseJsonObject.user.username);

  }
}

useEffect(() => {
  authToken();
}, [token]);

const authLogin = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      "Content-Type": "Application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const tokenObject = await response.json();
  
  if(tokenObject.token){
    localStorage.setItem('token', tokenObject.token);
    setToken(tokenObject.token);
  }
}

  return (
    <>
    {
      token ?
      <>
      <h2> Welcome {displayName}</h2>

      </>
      :
      <>
      <input 
      onChange={(event) => {setUsername(event.target.value)}}
      placeholder="username"
      />

      <input
      onChange={(event) => {setPassword(event.target.value)}} 
      placeholder="password"
      />
      <button onClick={ authLogin }>Login</button>
      </>
      }
    </>
  )
}

export default App
