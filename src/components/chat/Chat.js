import styles from './WorkChat.module.css'
import Message from "./Message/Message";
import {useChat} from "../../hooks/useChat";
import axios from "axios";

const Chat = ({user}) => {
    const {getMessages, changeHandler, messages, input} = useChat(user)
    const sendMessage = () => {
        axios.post('http://localhost:3000/send/', {title: input, name: user.firstName}).then(() => {
            getMessages()
        })
    }
    return (
        <div className={styles.container}>
            <h2>Node.js Chat webSockets react</h2>
            <div className={styles.chat}>
                {!!messages ? messages.map(m => <Message key={m.id} m={m}/>) : "Сообщений нет"}
            </div>
            <div className={styles.message}>
                <textarea value={input} onChange={event => changeHandler(event)} name="message"/>
                <button onClick={() => sendMessage()}>Отправить</button>
            </div>
        </div>
    )
}
export default Chat