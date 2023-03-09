import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const PlaceSinglePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null)
    //grabbing info by using use effect 
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id])

    if(!place) return '';

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-2xl'>{place.title}</h1>
            <h2>{place.address}</h2>
        </div>
    )
}

export default PlaceSinglePage