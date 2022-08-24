import React from 'react'
import { useParams } from 'react-router-dom';

const Character = () =>{
    let { characterId } = useParams();

    const characterUrl = 'https://marvel.local/api/characters/'+characterId;
    const showData = async () =>{
        const response = await fetch(characterUrl);
        const data = await response.json();
        console.log(data);
    }
    showData();
    return (
        <div>
            character #{characterId} page
        </div>
      )
}

export default Character;