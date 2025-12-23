import './App.css';
import React, {useEffect, useState} from 'react';
import type {StudyRoom} from './types';
import Form from './components/Form';
export default function App(){
  const [headingMsg, setHeadingMsg] = useState<string>('Not Authenticated');
  const [spaceData, setSpaceData] = useState<StudyRoom[]>([]);
  useEffect(()=>{
    
    const authenticate = async ()=>{
      try{
        const res = await fetch('http://localhost:8000/api/spaces/authenticate',{method:'GET'});
        const serverMsg = await res.json()
        if(!res.ok){
          throw new Error(serverMsg.errorMsg || `Error: ${res.status}`)
        }
      setHeadingMsg(serverMsg.message);
    }
    catch(error){
      const errMsg = error instanceof Error? error.message: 'Unknown Issue Occured';
      setHeadingMsg(errMsg);
    }
    }
    authenticate()
},[])
return(
  <>
    <section>
      <h1>{headingMsg}</h1>
      <Form setSpaceData={setSpaceData}></Form>
    </section>
  </>
)
}