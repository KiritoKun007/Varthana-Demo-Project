import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';

const NavigationItems = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuth);

    return (
        <ul className={classes.NavigationItems}>
            {
                !isAuthenticated ? (
                    <Fragment>
                        <NavigationItem link="/login">
                            Login
                        </NavigationItem>
                        <NavigationItem link="/register" >
                            Register
                        </NavigationItem>
                    </Fragment>
                ) : (
                    <NavigationItem link="/logout" >
                        Logout
                    </NavigationItem>
                )
            }
        </ul>
    )
}

export default NavigationItems
