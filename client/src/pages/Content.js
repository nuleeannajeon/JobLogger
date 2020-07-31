import React, {useEffect} from 'react'
import { useGlobalStore } from '../components/GlobalStore';
import { useHistory } from 'react-router-dom';
import API from '../utils/API'
import Button from '@material-ui/core/Button';


const Content = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory()

    const getUserData = async () => {
        const userData = await API.getUserData()
        dispatch({do: "setUserData", ...userData})

        console.log(userData)
    }


    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    },[])

    return (
        <div>
            Behold, you must be logged in to see me.  Huraaaaaay.
            <p>Graphics design is my life, clearly</p>
            <Button onClick={() => {history.push('/settings')}}>
                Settings
            </Button>
            <Button onClick={() => {history.push('/logout')}}>
                Log out
            </Button>
        </div>
    )
}

export default Content;
