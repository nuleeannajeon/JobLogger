import React, {useEffect} from 'react'
import { useGlobalStore } from '../components/GlobalStore';
import API from '../utils/API'

const Content = () => {
    const [globalStore, dispatch] = useGlobalStore();

    const getUserData = async () => {
        const userData = await API.getUserData(globalStore.userId)
        console.log(userData)
    }


    useEffect(() => {
        getUserData()
    },[])

    return (
        <div>
            Behold, you must be logged in to see me.  Huraaaaaay.
        </div>
    )
}

export default Content;
