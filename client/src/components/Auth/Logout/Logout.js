import React, { Fragment } from 'react'
import classes from './Logout.module.css'

import * as actions from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const Logout = () => {

    console.log("Logout.js reached")

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const logout = () => {
        dispatch(actions.logout())
    } 

    let history = useHistory();

    useEffect(() => {
        if( user === null ) {
            history.push("/login");
        }
    }, [user])

    const [cancel, setCancel] = useState(false)

    const cancelLogout = () => {
        setCancel(true)
    }

    return (
        <div className={classes.Logout}>
            {cancel ? (
                <Redirect to="/" />
            ) : (
                <Fragment>
                    <h4>Are you sure?</h4>
                    <hr/>
                    <div className={classes.btnContainer}>
                        <button onClick={logout}>Logout</button>
                        <button onClick={cancelLogout}>Cancel</button>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Logout
