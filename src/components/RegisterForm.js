import {useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {useRegister} from "../hooks/useRegister";

export const RegisterForm = () => {
    const {changeHandler, registerUser, form} = useRegister()
    return (
        <div className="row px-l1 px-t1">
            <h3 className='px-l1'>Регистрация</h3>
            <form onSubmit={(event) => registerUser(event)} className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input onChange={changeHandler} value={form.firstName} id="first_name" name='firstName'
                               type="text"
                               className="validate"/>
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input onChange={changeHandler} value={form.lastName} id="last_name" name='lastName' type="text"
                               className="validate"/>
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" value={form.email} onChange={changeHandler} type="email" name='email'
                               className="validate"/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" name='password' value={form.password} onChange={changeHandler}
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