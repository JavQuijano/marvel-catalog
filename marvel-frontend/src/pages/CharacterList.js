import React from 'react'
import { useNavigate } from 'react-router-dom';

const CharacterList = () =>{
    let navigate = useNavigate();
    const characterListUrl = 'https://marvel.local/api/characters';
    const showData = async () =>{
        const response = await fetch(characterListUrl);
        const data = await response.json();
        console.log(data);
    }
    showData();
    return (
        <div>
            character list page
        </div>
      )
}

export default CharacterList;