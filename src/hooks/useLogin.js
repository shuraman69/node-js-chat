import axios from "axios";
import {useState} from "react";

export const useLogin = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (event) => {
        setForm(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const login = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/login', {...form}).then(res => {
            localStorage.setItem('token', res.data.token)
        })
    }
    return {login, changeHandler, form}
}