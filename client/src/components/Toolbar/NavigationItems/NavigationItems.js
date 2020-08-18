import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const NavigationItems = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);

    let logout = ''

    if(user) {
        logout = capitalizeFirstLetter(user.user_name);
    }

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
                    <Fragment>
                        <NavigationItem link="/color" >
                            Home
                        </NavigationItem>
                        <NavigationItem link="/user" >
                            {logout}
                        </NavigationItem>
                    </Fragment>
                )
            }
        </ul>
    )
}

export default NavigationItems
