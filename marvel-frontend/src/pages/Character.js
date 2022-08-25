import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import configData from '../config/config.json' 
import Loader from '../components/Loader'
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stats from '../components/Stats';
import { Button } from '@mui/material';
import './Character.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Character = () =>{
    let { characterId } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        fetch(`${configData.CHARACTER_URL}/${characterId}`)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setItems(result.data);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }
    const handleMarvelClick = (marvelUrl) =>{
        window.open(marvelUrl, '_blank');
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Loader loaderText="Loading Character Info"/>;
    } else {
        return (
            <div className="character-specific-container">
                <Grid container spacing={2} xs={12}>
                    <Grid xs={12} md={4}>
                        <Grid md={12} display={{xs:"block", md:"none"}}>
                            <Item><div className='name-container'><h1 className='hero-name'>{items.name}</h1></div></Item>
                        </Grid>
                        <Grid md={12} >
                            <Item><div className='img-container'><img className='hero-thumbnail' src={items.thumbnail} alt="Marvel Hero thumbnail"/></div></Item>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Grid md={12} display={{xs:"none", md:"block"}}>
                            <Item><div className='name-container'><h1 className='hero-name'>{items.name}</h1></div></Item>
                        </Grid>
                        <Grid md={12}>
                            <Item><div className='description-container'><p className='hero-description'>{(items.description == "")?"No description available": items.description}</p></div></Item>
                        </Grid>
                        <Grid md={12}>
                            <Item>
                                <Stats available_comics={items.available_comics} available_stories={items.available_stories} available_events={items.available_events} available_series={items.available_series}></Stats>
                            </Item>
                        </Grid>
                        <Grid md={12} textAlign={{xs:"center", md:"left"}}>
                            <Button variant="contained" onClick={()=>{handleMarvelClick(items.marvel_url)}}>Check on Marvel Website</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Character;