import './App.css';
import React, {useEffect} from 'react';
export default function App(){
  const KEY = import.meta.env.VITE_LIBCAL_KEY;
  const ID = import.meta.env.VITE_CLIENT_ID;
  useEffect(()=>{
    fetch(`https://ucsd.libcal.com/api/1`, {
      method: 'POST',
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        'client-id': ID,
        'client_secret': KEY,
        'grant-type': 'client-credentials'
      })})
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