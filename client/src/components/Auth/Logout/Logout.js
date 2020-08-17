import React, { Fragment } from 'react'
import classes from './Logout.module.css'

import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Logout = () => {

    console.log("Logout.js reached")

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(actions.logout())
    } 

    const [cancel, setCancel] = useState(false)

    const cancelLogout = () => {
        setCancel(true)
    }

    return (
        <div className={classes.Logout}>
            {cancel ? (
                <Redirect to="/color" />
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
