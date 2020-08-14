import React, { Fragment } from 'react'
import { useState } from 'react'

import classes from './Register.module.css'

import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';

const Register = () => {

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    })

    const { username, email, password } = inputs

    const onChangeInput = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    const onSubmitForm = (e) => {
        e.preventDefault();

        dispatch(actions.registerForm(inputs))
    } 

    return (
        <Fragment>
            <div>
                <div className={classes.Registration}>
                    <h4>Sign Up</h4>
                    <hr/>
                    <form className={classes.registerForm} onSubmit={onSubmitForm}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username"
                            value={username}
                            onChange={e => onChangeInput(e)} />

                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            value={email}
                            onChange={e => onChangeInput(e)} />

                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={e => onChangeInput(e)} />

                        <button className={classes.signup}>Sign Up</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
