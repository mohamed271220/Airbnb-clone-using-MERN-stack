import React from 'react'
import { useState,useEffect } from 'react'
import Perks from '../perks'
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import Nav from '../nav'
const PlaceFormPage = () => {
    const {id}= useParams();
    console.log({id})
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [photoLink, setPhotoLink] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [perks, setPerks] = useState([])
    const [description, setDescription] = useState("")
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
const [redirect, setRedirect] = useState(false)
   

useEffect(() => {
    if(!id){
        return;
    }
    axios.get('/places/'+id)

}, [id])


async function addNewPlace(ev) {
        ev.preventDefault();

        await axios.post('/places',
            {
                title,
                address,
                addedPhotos,
                description, perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests
            }
        );
        setRedirect(true)
    }


    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('')
    }


    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            console.log(data);
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }
if (redirect){
    return <Navigate to = {'/account/places'}/>
}

    return (
        <>
        <Nav/>
            <div>
                <form onSubmit={addNewPlace}>
                    <h2 className='text-2xl mt-4'>
                        Title
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        make it short and catchy
                    </p>
                    <input value={title} onChange={ev => setTitle(ev.target.value)}
                        type="text" placeholder='title, for example: My Home' />
                    <h2 className='text-2xl mt-4'>
                        Address
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        address to your place
                    </p>
                    <input value={address} onChange={ev => setAddress(ev.target.value)}
                        type="text" placeholder='Address' />
                    <h2 className='text-2xl mt-4'>
                        Photos
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        more = better
                    </p>
                    <div className='flex gap-2'>
                        <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                            type="text" placeholder={'Adding using a Link .....jpg'} />
                        <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                    </div>


                    <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div className=' h-32 flex' key={link}>
                                <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/' + link} alt='' />
                            </div>
                        ))}
                        <label className=' h-32 flex items-center gap-1  justify-center border bg-transparent rounded-2xl
                        p-2 text-2xl text-gray-600 cursor-pointer' >
                            <input type="file" multiple name="" id="" className='hidden'
                                onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>

                            Upload
                        </label>
                    </div>
                    <h2 className='text-2xl mt-4'>
                        Description
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        Describe your place
                    </p>
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}
                        name="" id="" cols="30" rows="10"></textarea>
                    <h2 className='text-2xl mt-4'>
                        Perks
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        select your perks
                    </p>
                    <Perks selected={perks} onChange={setPerks} />

                    <h2 className='text-2xl mt-4'>
                        extra info
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        house rules ,etc
                    </p>
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}
                        name="" id="" cols="30" rows="10"></textarea>
                    <h2 className='text-2xl mt-4'>
                        Check-in&out times.
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        add your check in and check out times
                    </p>
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className='mt-2 -mb-1'>
                                Check-in time
                            </h3>
                            <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                                type="text" placeholder='14' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>
                                Check-out time
                            </h3>
                            <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                                type="text" name="" id="" placeholder='13' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>
                                max number of guests
                            </h3>
                            <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
                                type="number" name="" id="" placeholder='2' />
                        </div>
                    </div>
                    <div>
                        <button className='primary my-4'>Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default PlaceFormPage