import React, { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../store/actions'

import classes from './Login.module.css'
import { checkValidity } from '../../../util/checkValidity'
import Input from '../../UI/Input/Input'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [form, setForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                name: 'email',
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                name: 'password',
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })

    const [show, setShow] = useState(false)
    const errorMessage = useSelector(state => state.auth.msg)
    const isAuth = useSelector(state => state.auth.isAuth)
    let history = useHistory()

    let timer = null;

    const setTimer = () => {
        
        timer = setTimeout(() => {
            setShow(false)
            timer = null
        }, 10000);
    }

    useEffect(() => {
        if(isAuth) {
            history.push("/")
        }
    }, [isAuth])

    useEffect(() => {

        if(errorMessage !== '') {
            setShow(true)
            setTimer()
        }
        return () => {
            clearTimeout(timer)
        }
    }, [errorMessage, timer])

    const onChangeInput = e => {

        e.preventDefault();

        const updatedForm = { ...form }

        const updatedFormElement = {
            ...updatedForm[e.target.name]
        }

        updatedFormElement.value = e.target.value

        let validationObj = {}

        if(updatedFormElement.validation) {
            validationObj = checkValidity(updatedFormElement.value, updatedFormElement.validation)

            updatedFormElement.valid = validationObj.isValid
            updatedFormElement.validationMessage = validationObj.message
        }

        updatedFormElement.touched = true

        updatedForm[e.target.name] = updatedFormElement

        let formIsValid = true

        for ( let key in updatedForm ) {
            formIsValid = updatedForm[key].valid && formIsValid
        }

        setForm(updatedForm)
    }

    const dispatch = useDispatch()

    const onSubmitForm = (e) => {
        e.preventDefault()

        const formData = {}

        for ( let key in form ) {
            formData[key] = form[key].value
        }

        dispatch(actions.loginForm(formData))
    }

    const formElementArray = []

    for (let key in form) {
        formElementArray.push({
            id: key,
            ...form[key]
        })
    }

    let formUI = (
        <form onSubmit={onSubmitForm} className={classes.loginForm}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    value={formElement.value}
                    inputHandler={onChangeInput}
                    inValid={!formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                    validationErrorMsg={formElement.validationMessage} />
            ))}

            <button className={classes.login} >Login</button>

        </form>
    )

    let msg = <p className={classes.ErrorMessage}>Error: {errorMessage}</p>

    return (
        <Fragment>
            <div>
                <div className={classes.Login}>
                    <h4>Login</h4>
                    <hr/>
                    {formUI}
                    {show && (
                        msg
                    ) }
                </div>
            </div>
        </Fragment>
    )
}

export default Login
