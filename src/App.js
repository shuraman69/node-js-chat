import {RegisterForm} from "./components/RegisterForm";
import {LoginPage} from "./components/Login/LoginPage";
import {Route} from 'react-router-dom';
import {Navbar} from "./components/NavBar/Navbar";

import {useAuth} from "./hooks/useAuth";
import './App.css';
import Chat from "./components/chat/Chat";

function App() {
    const {user} = useAuth()
    return (
        <>
            <Navbar user={user}/>
            <Route path='/chat' render={() => <Chat  user={user}/>}/>
            <Route path='/register' render={() => <RegisterForm/>}/>
            <Route path='/login' render={() => <LoginPage/>}/>
        </>
    );
}

export default App;
