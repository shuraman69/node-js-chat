import axios from "axios";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin";

export const LoginPage = () => {
const {login,changeHandler,form}=useLogin()
    return (
        <div className="row px-l1 px-t1">
            <h3 className='px-l1'>Логин</h3>
            <div className="row px-l1">
                У вас нет аккаунта?
                <div className="row mx-t1">
                    <NavLink to='/register'>
                        <button className="btn waves-effect waves-light " name="action">Регистрация
                            <i className="material-icons right">send</i>
                        </button>
                    </NavLink>
                </div>
            </div>
            <form onSubmit={event => login(event)} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input onChange={changeHandler} value={form.email} id="email" type="email" name='email'
                               className="validate"/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input onChange={changeHandler} value={form.password} id="password" name='password'
                               type="password"
                               className="validate"/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}