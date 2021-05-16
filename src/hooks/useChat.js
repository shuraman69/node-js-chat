import axios from "axios";
import {useEffect, useState} from "react";

export const useChat = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const changeHandler = (e) => {
        setInput(e.target.value)
    }

    const getMessages = () => {
        axios.get('http://localhost:3000/messages').then(res => {
            setMessages(res.data)
        })
    }
    useEffect(() => {
        getMessages()
    }, [])
    return {input, messages, getMessages, changeHandler}
}