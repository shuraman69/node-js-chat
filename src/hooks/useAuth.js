import {useEffect, useState} from "react";
import axios from "axios";

export const useAuth = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/auth', {headers: {auth: localStorage.getItem('token')}}).then(res => {
                setUser({
                    firstName: res.data.user.firstName,
                    lastNameName: res.data.user.lastNameName,
                })
            })
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e)
        }
    }, [])

    return {user, setUser}
}