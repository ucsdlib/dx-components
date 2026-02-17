import type { StudyRoom } from "../types";
import React, {useState, type Dispatch, type SetStateAction} from 'react';

const Form:React.FC<{setSpaceData:Dispatch<SetStateAction<StudyRoom[]>>}> = ({setSpaceData}) =>{
    const [spaceId, setSpaceId] = useState<string>('');
    const handleSubmit = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault();
        // const fetchBody = new FormData();
        // fetchBody.append('spaceItemId', spaceId);
        try{
            const spaceRes = await fetch('http://localhost:8000/api/spaces/getSpace',{method:"POST", headers:{'Content-Type': 'application/json'}, body: JSON.stringify({'spaceItemId': spaceId})})
            const spaceInfo = await spaceRes.json();
            if(!spaceRes.ok) throw new Error(spaceInfo.errorMsg || `Error status${spaceRes.status}`)
            setSpaceData(spaceInfo);
        alert(JSON.parse(spaceInfo))
        }catch(error){
            const errorMessage = error instanceof Error? error.message: 'Issue with fetching data';
            alert(errorMessage);
        }
    }
    return(
        <>
            <form>
                <input onChange={e=> setSpaceId(e.currentTarget.value)} aria-label="Space ID Number" type="text"/>
                <button onClick={handleSubmit} type="submit">Get your room info</button>
            </form>
        </>
    )
}

export default Form;