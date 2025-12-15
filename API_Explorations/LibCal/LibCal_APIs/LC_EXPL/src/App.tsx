import './App.css';
import React, {useEffect} from 'react';
export default function App(){
  const KEY = import.meta.env.VITE_LIBCAL_KEY;
  const ID = import.meta.env.VITE_CLIENT_ID;
  // const [locData, setLocData] = useState({})
  useEffect(()=>{
    fetch(`https://ucsd.libcal.com/api/1.1/oauth/token`, {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({
    'client_id': ID,
    'client_secret': KEY,
    'grant_type': 'client_credentials'
  })
})
.then(res => {
  console.log('Status:', res.status);
  return res.json(); // Use .text() instead of .json() to see raw response
})
.then(data => {
  console.log('Response:', data);
  // Try to parse as JSON if it looks like JSON
  try {
    const json = data;
    console.log('Parsed:', json);
  } catch(e) {
    console.log('Not JSON, raw text:', data);
  }
})
.catch(err => console.error('Error:', err));
    
})
return(
  <>
    <section>
      <h1>LibCal Content</h1>
        <pre>
          <code>
            
          </code>
        </pre>
    </section>
  </>
)
}