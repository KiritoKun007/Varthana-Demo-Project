import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';
import DropDown from '../../UI/DropDown/DropDown';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const NavigationItems = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);

    const [show, setShow] = useState(false)

    const dropDownList = [
        {pathName: "Profile", path: "/user"},
        {pathName: "Logout", path: "/user/logout"}
    ]

    const dropdownRef = useRef()

    const openCloseDropDown = (e) => {

        if(dropdownRef.current.contains(e.target)) {
            setShow((prevState) => {
                return !prevState
            })
            return;
        }
    } 

    const closeDropDown = () => {
        setShow(false)
    }

    const openDropDown = () => {
        setShow(true)
    }

    return (
        <ul className={classes.NavigationItems} ref={dropdownRef}>
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
                        <NavigationItem link="/" >
                            Home
                        </NavigationItem>
                        <DropDown 
                            show={show}
                            openCloseDropDown={openCloseDropDown}
                            dropDownList={dropDownList}
                            closeDropDown={closeDropDown}
                            openDropDown={openDropDown} >
                            {user.user_name && capitalizeFirstLetter(user.user_name) }
                        </DropDown>
                    </Fragment>
                )
            }
        </ul>
    )
}

export default NavigationItems
