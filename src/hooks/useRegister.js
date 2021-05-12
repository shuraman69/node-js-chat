import {useHistory} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

export const useRegister=()=>{
    const history = useHistory()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
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
    const registerUser = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/register', form).then(res => {
            if (res.status === 200) {
                history.push('/login')
                alert('Регистрация прошла успешно')
            }
        }).catch(err => {
            alert("Ошибка")
            console.error(err)
        })

    }
    return {registerUser,changeHandler,form}
}