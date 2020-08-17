import React from 'react';
import classes from './Sidebar.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {

    let { url } = useRouteMatch()
    console.log(url)

    return (
        <div className={classes.Sidebar}>

            <ul>
                <li>
                    <NavLink to={url}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/logout`} >Logout</NavLink>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar
