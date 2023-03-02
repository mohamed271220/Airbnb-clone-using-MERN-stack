import React, { useContext ,useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom';
import axios from 'axios';



const Account = () => {
    const [toHomePage, setToHomePage] = useState(null)
    const { user, ready,setUser } = useContext(UserContext);


    let { subpage } = useParams();
    console.log(subpage);
    if (subpage === undefined) {
        subpage = 'profile';
    }
    async function logout() {
        await axios.post('/logout')
        setToHomePage('/');
        setUser(null);

    }

    if (!ready) {
        return 'Loading'
    }
    if (ready && !user && !toHomePage) {
        return <Navigate to={'/login'}></Navigate>
    }


    const linkClasses = (type = null) => {
        let classes = "py-2 px-6"

        if (type === subpage || (subpage === undefined && type === "profile")) {
            classes += " text-white bg-primary rounded-full"
        }
        return classes;
    }

    if (toHomePage) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-4 mb-8'>
                <Link className={linkClasses('profile')} to={'/account'} >
                    My Account
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'} >
                    My Bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'} >
                    My Accommodations
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto' >
                    Logged in as {user.data.name} ({user.data.email})
                    <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Account