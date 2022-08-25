import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import configData from '../config/config'
import 'styled-components'
import './CharacterList.css'
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const columns = [
    {
        name: 'ID',
        selector: row => row.id
    },
    {
        name: 'Thumbnail',
        cell: row => <img src={row.thumbnail} width={100} alt={row.name}></img>,
        selector: row => row.thumbnail
    },
    {
        name: 'Name',
        selector: row => row.name
    },
    {
        name: 'See more',
        selector: row => <Button variant="contained" startIcon={<VisibilityIcon />}><Link className='btn-link' to={"/character/"+row.id}>See More</Link></Button>
    }
  ];

const CharacterList = (offset = 0) =>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        fetchData(0, perPage);
    }, [perPage])

    const fetchData = async (page, per_page) => {
        fetch(`${configData.CHARACTER_URL}?offset=${page}&perPage=${per_page}`)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setItems(result.data);
            setTotalRows(result.total);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }

    const handlePageChange = page => {
        fetchData((page - 1) * perPage , perPage);
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Loader loaderText="Loading Character List"/>;
    } else {
        return (
        <div className="character-list-table">
            <DataTable className='character-table'
            columns={columns}
            data={items}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            />
        </div>
        );
    }
}


export default CharacterList;