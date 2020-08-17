import React, { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../../../store/actions'

import classes from './Login.module.css'

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const { email, password } = inputs

    const onChangeInput = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    const onSubmitForm = (e) => {
        e.preventDefault();

        dispatch(actions.loginForm(inputs))
    }

    return (
        <Fragment>
            <div>
                <div className={classes.Login}>
                    <h4>Login</h4>
                    <hr/>
                    <form className={classes.loginForm} onSubmit={onSubmitForm}>

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

                        <button className={classes.login}>Login</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login
