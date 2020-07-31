import React, {useEffect} from 'react'
import { useGlobalStore } from '../components/GlobalStore';
import { useHistory } from 'react-router-dom';
import API from '../utils/API'

const UserSettings = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory()

    const getUserData = async () => {
        const userData = await API.getUserData()
        console.log(userData)
    }


    useEffect(() => {
        getUserData()
    },[])

    return (
        <div>
            Behold, user settings.
        </div>
    )
}

export default UserSettings;
