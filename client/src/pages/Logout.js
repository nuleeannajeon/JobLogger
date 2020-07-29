import React from 'react'
import API from '../utils/API'
import { useGlobalStore } from '../components/GlobalStore';



const Logout = (props) => {
    const [, dispatch] = useGlobalStore();

    const logoutUser = async (logStateChanger) => {


        console.log('Logging out')
        sessionStorage.clear()
        localStorage.clear()
        const serverReturn = await API.post('/logout', {})
        dispatch({do: 'logout'})
    
    }

    return (
        <div style={{textAlign: "center", width:'100%'}}>
            Logging out.
        </div>
    )
}

export default Logout;
